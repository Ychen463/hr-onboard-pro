import Visa from '../models/VisaModel.js';
import Onboarding from '../models/OnboardingModel.js';
import UserAccount from '../models/UserAccountModel.js';

const getVisaDetails = async (req, res) => {
  try {
    const params = { userAccountId: req.params.userAccountId };
    const visa = await Visa.findOne(params).exec();
    if (!visa) {
      return res.status(404).json({ message: 'Visa record not found' });
    }
    return res.status(201).json({ message: 'get Visa Data successfully.', visa });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getCurrentStep = async (req, res) => {
  try {
    const { userAccountId } = req.params;
    const visa = await Visa.findOne({ userAccountId }).exec();

    if (!visa) {
      return res.status(404).json({ message: 'Visa record not found.' });
    }

    const steps = ['optReceipt', 'optEAD', 'i983', 'i20'];
    const stepNames = ['OPT RECEIPT', 'OPT EAD', 'I983', 'I20'];
    let currentStepIndex = -1;

    // Find the index of the current step
    for (let i = 0; i < steps.length; i += 1) {
      const statusToCheck = `${stepNames[i]}-Approved`;
      if (visa.docs[steps[i]].status !== statusToCheck) {
        currentStepIndex = i;
        break;
      }
    }

    let currentStep;
    let nextStep;

    if (currentStepIndex === -1) {
      // All steps are approved
      currentStep = steps[steps.length - 1];
      nextStep = null;
    } else {
      currentStep = steps[currentStepIndex];
      nextStep =
        currentStepIndex + 1 < steps.length &&
        visa.docs[steps[currentStepIndex]].status === `${stepNames[currentStepIndex]}-Approved`
          ? steps[currentStepIndex + 1]
          : steps[currentStepIndex];
    }

    // Constructing the response message based on the current step
    let responseMessage = `Current step: ${currentStep}.`;
    if (nextStep && nextStep !== currentStep) {
      responseMessage += ` Next step: ${nextStep}.`;
    } else {
      responseMessage += ' Next step is the same as current step until approved.';
    }
    // currentVisa = visa.docs[currentStep] ? visa.docs[currentStep] : {}
    // currentVisa = visa.docs[currentStep]
    // console.log(currentStep)
    console.log(visa.docs[currentStep])
    console.log(visa.docs[currentStep].status)

    return res.status(200).json({
      message: responseMessage,
      visa:{
        currentStep: visa.docs[currentStep].status.split('-')[0],
        currentStatus: visa.docs[currentStep].status.split('-')[1],
        rejFeedback: visa.docs[currentStep].rejFeedback,
        docId: visa.docs[currentStep].docId,
        docUrl: visa.docs[currentStep].docUrl,
      }
        // currentStep: stepNames[i],
        // currentStatus: currentVisa.status,
        // feedback:  currentVisa.feedback ?   currentVisa.feedback : "",
        // docId: currentVisa.feedback ?   currentVisa.docId: "",
        // docUrl: currentVisa.docUrl
      // nextStep: nextStep && nextStep !== currentStep ? visa.docs[nextStep] : null,
    });
  } catch (error) {
    console.error('Error fetching current step:', error);
    return res.status(500).json({ message: error.message });
  }
};

const docTypeToDocTypeName = {
  optReceipt: 'OPT RECEIPT',
  optEAD: 'OPT EAD',
  i983: 'I983',
  i20: 'I20',
};

const updateDoc = async (req, res) => {
  const { userAccountId, docType } = req.params;
  const { docUrl } = req.body;
  const docTypeName = docTypeToDocTypeName[docType];

  try {
    const visa = await Visa.findOne({ userAccountId }).exec();
    if (!visa) {
      return res.status(404).json({ message: 'Visa record not found.' });
    }

    // Document sequence
    const steps = ['optReceipt', 'optEAD', 'i983', 'i20'];
    const currentIndex = steps.indexOf(docType);

    // Check if previous steps are all Approved
    for (let i = 0; i < currentIndex; i += 1) {
      const prevDocType = steps[i];
      if (!visa.docs[prevDocType].status.endsWith('-Approved')) {
        return res.status(403).json({
          message: `Cannot proceed. ${docTypeToDocTypeName[prevDocType]} is not approved.`,
        });
      }
    }

    // Initiate update
    const update = {
      [`docs.${docType}.status`]: `${docTypeName}-Pending`,
      [`docs.${docType}.docId`]: `${userAccountId}_${docType}`,
      [`docs.${docType}.createdDatetime`]: new Date(),
      [`docs.${docType}.docUrl`]: docUrl,
      visaStatus: `${docTypeName}-Pending`,
    };

    // Update Visa document
    const updatedVisa = await Visa.findOneAndUpdate({ userAccountId }, update, {
      new: true,
    }).exec();

    await UserAccount.findOneAndUpdate(
      { _id: userAccountId },
      { visaStatus: `${docTypeName}-Pending` },
      { new: true }
    );
    await Onboarding.findOneAndUpdate(
      { _id: visa.onboardingId },
      { visaStatus: `${docTypeName}-Pending` },
      { new: true }
    );

    return res.status(200).json({
      message: `${docTypeName} updated successfully.`,
      visa: {
        currentStep: docTypeName,
        currentStatus: "Pending",
        feedback: "",
        docId: `${userAccountId}_${docType}`,
        docUrl: docUrl
      },
    });
  } catch (error) {
    console.error('Error updating document:', error);
    return res.status(500).json({ message: error.message });
  }
};

const updateVisaDecision = async (req, res) => {
  const { userAccountId, docType } = req.params;
  const { decision, rejFeedback } = req.body;

  const docTypes = ['optReceipt', 'optEAD', 'i983', 'i20'];
  const docTypeNames = ['OPT RECEIPT', 'OPT EAD', 'I983', 'I20'];
  const index = docTypes.indexOf(docType);
  const docTypeName = docTypeNames[index];
  // Construct document and Visa status based on decision
  const docStatus = `${docTypeName}-${decision}`;

  try {
    const visa = await Visa.findOne({ userAccountId }).exec();
    if (!visa) {
      return res.status(404).json({ message: 'Visa record not found.' });
    }
    const currentDoc = visa.docs[docType];
    if (!currentDoc.url && currentDoc.status !== `${docTypeName}-Pending`) {
      return res.status(400).json({
        message: `Error: Document for ${docTypeName} must be uploaded before HR can make a ${decision} decision.`,
      });
    }
    const update = {
      [`docs.${docType}.status`]: docStatus,
    };
    if (decision === 'Rejected') {
      update[`docs.${docType}.rejFeedback`] = rejFeedback || 'No feedback provided.';
      update.visaStatus = docStatus;
    } else if (decision === 'Approved') {
      update.visaStatus = docStatus;
      update[`docs.${docType}.rejFeedback`] = '';
    }

    await Visa.findOneAndUpdate({ userAccountId }, update, {
      new: true,
    }).exec();
    const nextIndex = index + 1;
    if (nextIndex < docTypes.length && decision === 'Approved') {
      const nextDocType = docTypes[nextIndex];
      const nextDocTypeName = docTypeNames[nextIndex];
      await Visa.findOneAndUpdate(
        { userAccountId },
        { [`docs.${nextDocType}.status`]: `${nextDocTypeName}-Await` },
        { new: true }
      ).exec();
    }
    await UserAccount.findOneAndUpdate(
      { _id: userAccountId },
      { visaStatus: docStatus },
      { new: true }
    ).exec();

    // Fetch the updated visa document to return the latest status
    const updatedVisa = await Visa.findOne({ userAccountId }).exec();
    return res.status(200).json({
      message: `Visa document ${docType} status updated to ${docStatus}.`,
      updatedDocument: updatedVisa.docs[docType],
      nextDocumentStatus:
        nextIndex < docTypes.length && decision === 'Approved'
          ? `${docTypeNames[nextIndex]}-Await`
          : 'None',
    });
  } catch (error) {
    console.error('Error updating visa document status:', error);
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const visas = await Visa.find().exec();
    return res.status(200).json({ visas });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getWithOnboardingAll = async (req, res) => {
  try {
    const visas = await Visa.aggregate([
      {
        $lookup: {
          from: "onboardings",
          localField: "userAccountId",
          foreignField: "userAccountId",
          as: "onboardingInfo"
        }
      },
      {
        $match: {
          "onboardingInfo": { $ne: [] } 
        }
      }
    ]);

    return res.status(200).json(visas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  getVisaDetails,
  getCurrentStep,
  updateDoc,
  updateVisaDecision,
  getAll,
  getWithOnboardingAll,
};
