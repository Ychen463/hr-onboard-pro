import Onboarding from '../models/OnboardingModel.js';
import UserAccount from '../models/UserAccountModel.js';

// 1. Apply onboarding
const applyUserOnboarding = async (req, res) => {
  const NEW_STATUS = 'Pending';
  const {
    personalInfo, citizenshipStatus, driverLicense, referral, emergencyContacts,
  } = req.body;

  try {
    const onboardingDocument = {
      userAccountId: req.user.userId,
      onboardingStatus: NEW_STATUS,
      personalInfo,
      citizenshipStatus,
      driverLicense,
      referral,
      emergencyContacts,
    };
    const savedOnboardingData = await Onboarding.create(onboardingDocument);

    // update the onboarding status in UserAccount
    const userAccount = await UserAccount.findOneAndUpdate(
      { _id: req.user.userId },
      { $set: { OnboardingStatus: NEW_STATUS } },
      { new: true },
    ).exec();
    if (!userAccount) {
      return res.status(404).json({ message: 'User Account not found.' });
    }

    return res.status(201).json(savedOnboardingData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// Get Onboarding Record API
const getUserOnboarding = async (req, res) => {
  try {
    const params = { userAccountId: req.params.userAccountId };
    const onboardingData = await Onboarding.findOne(params).exec();
    if (!onboardingData) {
      return res.status(404).json({ message: 'Onboarding record not found' });
    }
    return res.status(201).json({ message: 'getOnboarding Data successfully.', onboardingData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { applyUserOnboarding, getUserOnboarding };
