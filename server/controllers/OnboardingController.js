// eslint-disable-next-line import/no-extraneous-dependencies
import he from 'he';
import Onboarding from '../models/OnboardingModel.js';
import UserAccount from '../models/UserAccountModel.js';
import Visa from '../models/VisaModel.js';
import UserProfile from '../models/UserProfileModel.js';

// 1. Apply onboarding
const applyUserOnboarding = async (req, res) => {
  // Check if onboarding already exists

  const userAccountId = req.user.userId;
  const onboardingExists = await Onboarding.findOne({ userAccountId }).lean().exec();
  if (onboardingExists) {
    return res.status(409).json({ message: `Onboarding for ${userAccountId} already exists` });
  }

  const ONBOARDING_STATUS = 'Pending';
  const CURRENT_DOC_VISA_STATUS = 'Pending';
  const CURRENT_DOC = 'OPT RECEIPT';
  const visaStatus = `${CURRENT_DOC}-${CURRENT_DOC_VISA_STATUS}`;
  const { personalInfo, citizenshipStatus, driverLicense, referral, emergencyContacts } = req.body;
  try {
    const userAccount = await UserAccount.findOne({ _id: userAccountId });
    if (!userAccount) {
      return res.status(404).json({ message: 'User Account not found.' });
    }
    userAccount.visaStatus = visaStatus;
    await userAccount.save();
    const { email } = userAccount;
    // Update citizenshipStatus with visaId if it exists
    const updatedCitizenshipStatus = { ...citizenshipStatus };

    if (
      req.body.citizenshipStatus.workAuthorization === 'F1(CPT/OPT)' &&
      req.body.citizenshipStatus.workAuthorizationFiles
    ) {
      updatedCitizenshipStatus.visaId = Object._id;
      updatedCitizenshipStatus.workAuthorizationFiles[0].docId = `${userAccountId}_optReceipt`;
    }
    const { visaId } = updatedCitizenshipStatus;
    // Create the onboarding document
    const onboardingDocument = {
      userAccountId,
      email, // prefilled, cannot be changed by user
      onboardingStatus: ONBOARDING_STATUS,
      rejFeedback: '',
      personalInfo,
      citizenshipStatus: updatedCitizenshipStatus,
      driverLicense,
      referral,
      emergencyContacts,
      visaId,
    };
    const savedOnboardingData = await Onboarding.create(onboardingDocument);
    userAccount.onboardingStatus = ONBOARDING_STATUS;
    await userAccount.save();

    return res.status(201).json(savedOnboardingData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// 2. Update
const updateUserOnboarding = async (req, res) => {
  // Check if onboarding already exists

  const userAccountId = req.user.userId;
  const ONBOARDING_STATUS = 'Pending';
  const CURRENT_DOC_VISA_STATUS = 'Pending';
  const CURRENT_DOC = 'OPT RECEIPT';
  const visaStatus = `${CURRENT_DOC}-${CURRENT_DOC_VISA_STATUS}`;
  const { personalInfo, citizenshipStatus, driverLicense, referral, emergencyContacts } = req.body;
  try {
    const userAccount = await UserAccount.findOne({ _id: userAccountId });
    if (!userAccount) {
      return res.status(404).json({ message: 'User Account not found.' });
    }
    userAccount.visaStatus = visaStatus;
    await userAccount.save();
    const { email } = userAccount;
    // Update citizenshipStatus with visaId if it exists
    const updatedCitizenshipStatus = { ...citizenshipStatus };

    if (
      req.body.citizenshipStatus.workAuthorization === 'F1(CPT/OPT)' &&
      req.body.citizenshipStatus.workAuthorizationFiles
    ) {
      updatedCitizenshipStatus.visaId = Object._id;
      updatedCitizenshipStatus.workAuthorizationFiles[0].docId = `${userAccountId}_optReceipt`;
    }
    const { visaId } = updatedCitizenshipStatus;
    // Create the onboarding document
    const filter = { userAccountId };
    const update = {
      email, // prefilled, cannot be changed by user
      onboardingStatus: ONBOARDING_STATUS,
      rejFeedback: '',
      personalInfo,
      citizenshipStatus: updatedCitizenshipStatus,
      driverLicense,
      referral,
      emergencyContacts,
      visaId,
    };

    const savedOnboardingData = await Onboarding.findOneAndUpdate(filter, update, { new: true });

    userAccount.onboardingStatus = ONBOARDING_STATUS;
    await userAccount.save();

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
// HR UPDATE DECISION
const hrUpdateDecision = async (req, res) => {
  try {
    const { userAccountId } = req.params;
    const { hrDecision } = req.body;
    let { rejFeedback } = req.body;

    // Validate HR Decision
    if (!hrDecision || !['Rejected', 'Approved'].includes(hrDecision)) {
      return res.status(400).json({ message: 'Invalid HR Decision.' });
    }

    // Sanitize rejection feedback if present
    if (rejFeedback && typeof rejFeedback === 'string') {
      rejFeedback = he.encode(rejFeedback);
    }

    let ONBOARDING_STATUS;
    if (hrDecision === 'Rejected') {
      ONBOARDING_STATUS = 'Rejected';
    } else if (hrDecision === 'Approved') {
      ONBOARDING_STATUS = 'Completed';
    }

    const updateFields = { onboardingStatus: ONBOARDING_STATUS };
    if (ONBOARDING_STATUS === 'Rejected' && rejFeedback) {
      // Ensure rejFeedback is included only if the decision is Rejected
      updateFields.rejFeedback = rejFeedback;
    }

    // Update the onboarding status based on the HR decision
    const updatedOnboarding = await Onboarding.findOneAndUpdate({ userAccountId }, updateFields, {
      new: true,
    });

    if (!updatedOnboarding) {
      return res.status(404).json({ message: 'Onboarding process not found.' });
    }

    // CREATE VISA if needed
    const visaStatus = 'OPT EAD-Pending';
    let updateVisaFields;
    if (
      updatedOnboarding.citizenshipStatus.workAuthorization === 'F1(CPT/OPT)' &&
      updatedOnboarding.citizenshipStatus.workAuthorizationFiles
    ) {
      const { workAuthorizationFiles } = updatedOnboarding.citizenshipStatus;
      const visa = await Visa.create({
        userAccountId,
        docs: {
          optReceipt: {
            docId: `${userAccountId}_optReceipt`,
            docUrl: workAuthorizationFiles[0].docUrl, // Assuming the first file is the OPT receipt
            createdDatetime: new Date(),
            status: visaStatus,
          },
        },
        visaStatus,
      });
      // Update the user account onboarding status
      updateVisaFields = {
        visaId: visa._id,
        onboardingStatus: ONBOARDING_STATUS,
      };
      // Update onboarding visaId
      await Onboarding.findOneAndUpdate({ userAccountId }, { visaId: visa._id }, { new: true });
    } else {
      updateVisaFields = {
        onboardingStatus: ONBOARDING_STATUS,
      };
    }
    await UserAccount.findOneAndUpdate({ _id: userAccountId }, updateVisaFields, { new: true });

    // Create USERPROFILE
    await UserProfile.create({
      userAccountId,
      onboardingId: updatedOnboarding._id,
      personalInfo: updatedOnboarding.personalInfo,
      employmentStatus: 'Active',
      citizenshipStatus: updatedOnboarding.citizenshipStatus,
      driverLicense: updatedOnboarding.driverLicense,
      emergencyContacts: updatedOnboarding.emergencyContacts,
    });

    return res.status(200).json(updatedOnboarding);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const viewOnboardingApplicationsByStatus = async (req, res) => {
  try {
    const { onboardingStatus, visaStatus } = req.query;
    const matchStage = {};
    if (onboardingStatus) {
      matchStage.onboardingStatus = onboardingStatus;
    }
    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: 'visas',
          localField: 'visaId',
          foreignField: '_id',
          as: 'visaInfo',
        },
      },
      { $unwind: '$visaInfo' },
    ];
    if (visaStatus) {
      pipeline.push({ $match: { 'visaInfo.visaStatus': visaStatus } });
    }
    const applications = await Onboarding.aggregate(pipeline);
    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found matching the criteria.' });
    }
    res.json(applications);
  } catch (error) {
    console.error('Error fetching onboarding applications:', error);
    res.status(500).json({ message: 'Error fetching onboarding applications' });
  }
};

const getAllTokens = async (req, res) => {
  try {
    const tokens = await Onboarding.find();
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export {
  applyUserOnboarding,
  getUserOnboarding,
  hrUpdateDecision,
  viewOnboardingApplicationsByStatus,
  getAllTokens,
  updateUserOnboarding,
};
