import UserProfile from '../models/UserProfileModel.js';

// Get all employees' profile summary, sort by last name alphabetically
// Name, SSN, Work Authorization Title, Phone Number, email(account)
// Note: email here is the email used for registration and can not be modified
// TODO: check with the team whether Work Authorization status may be modified,
// and also email field in AccountSchema
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
      email: profile.userAccountId.registrationEmail,
      workAuthorization: profile.citizenshipStatus.workAuthorization,
      firstName: profile.personalInfo.firstName,
      lastName: profile.personalInfo.lastName,
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

export { getAllProfileSummary };
