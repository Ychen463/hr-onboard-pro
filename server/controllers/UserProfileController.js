import UserAccount from '../models/UserAccountModel.js';
import UserProfile from '../models/UserProfileModel.js';

// Get all employees' profile summary, sort by last name alphabetically
// Name(first, last, preferred), SSN, Work Authorization Title, Phone Number, email(account)
// Note: email here is the email used for registration and can not be modified
// TODO: check with the team the email field in AccountSchema
// TODO: error handling, if userAccountId/onboardingId not found in their collection?
const getAllProfileSummary = async (req, res) => {
  try {
    const profileListFound = await UserProfile.find().populate('userAccountId').select(
      'userAccountId citizenshipStatus personalInfo',
    ).sort({ 'personalInfo.lastName': 1 })
      .lean()
      .exec();
    console.log(profileListFound);
    const profileList = profileListFound.map((profile) => ({
      userProfileId: profile._id,
      userAccountId: profile.userAccountId._id,
      email: profile.userAccountId.registrationEmail,
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

  try {
    const profile = await UserProfile.findOne({ userAccountId }).lean().exec();
    const account = await UserAccount.findById(profile.userAccountId).lean().exec();
    // if no profile found
    if (!profile) {
      return res.status(422).json({ message: 'Profile doesn’t exist.' });
    }
    if (!account) {
      return res.status(422).json({ message: 'Profile is not linked to a valid account.' });
    }

    const email = account.registrationEmail;
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
    const account = await UserAccount.findById(profile.userAccountId).lean().exec();
    // if no profile found
    if (!profile) {
      return res.status(422).json({ message: 'Profile doesn’t exist.' });
    }
    if (!account) {
      return res.status(422).json({ message: 'Profile is not linked to a valid account.' });
    }

    const email = account.registrationEmail;
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
    const updatedProfile = await UserProfile
      .findByIdAndUpdate(newProfile._id, newProfile, { new: true }).lean().exec();
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

export {
  getAllProfileSummary, getEmployeeFullProfile, getProfile, updateProfile,
};
