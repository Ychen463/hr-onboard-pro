// TODO: error handling check: add isValidObjectId check
import validator from 'validator';
import UserAccount from '../models/UserAccountModel.js';
import UserProfile from '../models/UserProfileModel.js';
import Onboarding from '../models/OnboardingModel.js';

// Get all employees' profile summary, sort by last name alphabetically
// Name(first, last, preferred), SSN, Work Authorization Title, Phone Number, email(account)
// Note: email here is the email in UserAccountSchema and can not be modified
const getAllProfileSummary = async (req, res) => {
  try {
    const profileListFound = await UserProfile.find()
      .populate('userAccountId')
      .select('userAccountId citizenshipStatus personalInfo')
      .sort({ 'personalInfo.lastName': 1 })
      .lean()
      .exec();

    const validProfiles = profileListFound.filter((profile) => profile.userAccountId !== null);

    if (validProfiles.length !== profileListFound.length) {
      return res.status(404).json({
        message: 'UserAccount not found for one or more profiles.',
      });
    }

    const profileList = profileListFound.map((profile) => ({
      userProfileId: profile._id,
      userAccountId: profile.userAccountId._id,
      email: profile.userAccountId.email,
      workAuthorization: profile.citizenshipStatus.workAuthorization,
      firstName: profile.personalInfo.firstName,
      lastName: profile.personalInfo.lastName,
      preferredName: profile.personalInfo.preferredName,
      phoneNumber: profile.personalInfo.contactSchema,
      ssn: profile.personalInfo.ssn,
    }));

    res.status(200).json({
      message: 'Profile list found.',
      profileList,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// View an employee’s entire profile, for HR
const getEmployeeFullProfile = async (req, res) => {
  const { userAccountId } = req.body;
  if (!userAccountId) {
    res.status(422).json({ message: 'Missing userAccountId to fetch a user profile.' });
    return;
  }

  try {
    const profile = await UserProfile.findOne({ userAccountId }).lean().exec();
    const account = await UserAccount.findById(profile.userAccountId).lean().exec();
    // if no profile found
    if (!profile) {
      return res.status(422).json({ message: 'Profile doesn’t exist.' });
    }
    if (!account) {
      return res.status(422).json({ message: 'Could not find the user account.' });
    }

    const { email } = account;
    profile.email = email;

    delete profile.userAccountId;
    delete profile.onboardingId;

    res.status(200).json({
      message: 'Profile found.',
      profile,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// For an employee to view own profile
const getProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const profile = await UserProfile.findOne({ userAccountId: userId }).lean().exec();
    // if no profile found
    if (!profile) {
      return res.status(422).json({ message: 'Profile doesn’t exist.' });
    }
    const account = await UserAccount.findById(profile.userAccountId).lean().exec();
    if (!account) {
      return res.status(422).json({ message: 'Could not find the user account.' });
    }

    const { email } = account;
    profile.email = email;

    delete profile.userAccountId;
    delete profile.onboardingId;

    res.status(200).json({
      message: 'Profile found.',
      profile,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modify user profile
const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { newProfile } = req.body;

  try {
    // Validate the email
    if (newProfile.email && !validator.isEmail(newProfile.email)) {
      return res.status(422).json({ message: 'Invalid email format.' });
    }

    // Sanitize inputs that will be rendered in HTML
    // newProfile = sanitizeProfile(newProfile);
    console.log('newProfile', newProfile);

    // check if the profile exists and whether the user is trying to modify his/her own profile
    const profile = await UserProfile.findById(newProfile._id).lean().exec();
    if (!profile) {
      return res.status(422).json({ message: 'Profile doesn’t exist.' });
    }
    if (String(profile.userAccountId) !== userId) {
      return res.status(403).json({ message: 'The user is not updating his/her own profile.' });
    }

    // If pass the check, take out unnecessary fields and do the update
    const { email } = newProfile;
    delete newProfile.email;
    delete newProfile.citizenshipStatus;
    const updatedProfile = await UserProfile.findByIdAndUpdate(newProfile._id, newProfile, {
      new: true,
    })
      .lean()
      .exec();
    // console.log(updatedProfile);
    // send the user fields for display
    updatedProfile.email = email;

    delete updatedProfile.userAccountId;
    delete updatedProfile.onboardingId;

    res.status(200).json({
      message: 'Profile updated.',
      updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Sanitize profile fields
function sanitizeProfile(profile) {
  const sanitizedProfile = {};
  Object.keys(profile).forEach((key) => {
    const value = profile[key];
    // Assuming all fields are strings; adjust as necessary
    sanitizedProfile[key] = typeof value === 'string' ? he.encode(value) : value;
  });
  return sanitizedProfile;
}

// Create new profile for an employee who finished onboarding
const createUserProfile = async (req, res) => {
  const { userAccountId, onboardingId } = req.body;
  if (!(userAccountId && onboardingId)) {
    return res.status(422).json({
      message: 'Missing userAccountId and onboardingId to create a user profile.',
    });
  }
  // Validation for presence
  if (!(userAccountId && onboardingId)) {
    return res.status(422).json({
      message: 'Missing userAccountId and onboardingId to create a user profile.',
    });
  }

  // Validation for format
  if (!validator.isMongoId(userAccountId) || !validator.isMongoId(onboardingId)) {
    return res.status(422).json({
      message: 'Invalid format for userAccountId or onboardingId.',
    });
  }

  try {
    const account = await UserAccount.findById(userAccountId).lean().exec();
    const onboarding = await Onboarding.findById(onboardingId).lean().exec();
    if (!account) {
      return res.status(422).json({ message: 'User account doesn’t exist.' });
    }
    if (!onboarding) {
      return res.status(422).json({ message: 'Onboarding record doesn’t exist.' });
    }
    if (String(onboarding.userAccountId) !== userAccountId) {
      return res.status(409).json({
        message: 'userAccountId sent doesn’t match the userAccountId in the onboarding record.',
      });
    }
    if (onboarding.onboardingStatus !== 'Completed') {
      return res.status(409).json({ message: 'Onboarding is not completed.' });
    }

    const duplicate = await UserProfile.findOne({ userAccountId }).lean().exec();
    if (duplicate) {
      console.log(duplicate);
      return res.status(409).json({
        message: 'Profile with the same userAccountId already exists.',
      });
    }

    // based on information in onboarding record, create the user profile
    const newProfileInfo = {
      userAccountId,
      onboardingId,
      personalInfo: onboarding.personalInfo,
      employmentStatus: 'Active',
      citizenshipStatus: onboarding.citizenshipStatus,
      driverLicense: onboarding.driverLicense,
      emergencyContacts: onboarding.emergencyContacts,
    };

    const profileCreated = await UserProfile.create(newProfileInfo);
    if (profileCreated) {
      res.status(201).json({
        message: 'Profile created.',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getAllProfileSummary,
  getEmployeeFullProfile,
  getProfile,
  updateProfile,
  createUserProfile,
};
