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
    const currentIndex = steps.findIndex((step, index) => {
      const statusToCheck = `${stepNames[index]}-Approved`;
      return visa.docs[step].status !== statusToCheck;
    });
    let currentStep; let
      nextStep;

    if (currentIndex === -1) { // All steps are approved
      currentStep = steps[steps.length - 1]; // The last step
      nextStep = null; // No next step
    } else {
      currentStep = steps[currentIndex];
      nextStep = currentIndex + 1 < steps.length ? steps[currentIndex + 1] : null;
    }
    // Constructing the response message based on the current step
    let responseMessage = `Current step: ${currentStep}.`;
    if (nextStep) {
      responseMessage += ` Next step: ${nextStep}.`;
    }

    return res.status(200).json({
      message: responseMessage,
      currentStep: visa.docs[currentStep] ? visa.docs[currentStep] : {},
      nextStep: nextStep ? visa.docs[nextStep] : null,
    });
  } catch (error) {
    console.error('Error fetching current step:', error);
    return res.status(500).json({ message: error.message });
  }
};
async function updateVisaDocument({
  userAccountId, docType, docTypeName, docUrl, newStatus = `${docTypeName}-Pending`,
}) {
  try {
    const visa = await Visa.findOne({ userAccountId }).exec();
    if (!visa) {
      return { error: true, statusCode: 404, message: 'Visa record not found.' };
    }
    // doc sequence
    const steps = ['optReceipt', 'optEAD', 'i983', 'i20'];
    const currentIndex = steps.indexOf(docType);
    // Check prev steps are all Approved
    for (let i = 0; i < currentIndex; i += 1) {
      const prevDocType = steps[i];
      if (!visa.docs[prevDocType].status.endsWith('-Approved')) {
        return {
          error: true,
          statusCode: 403,
          message: `Cannot proceed. ${prevDocType} is not approved.`,
        };
      }
    }
    // Initiate
    const update = {
      [`docs.${docType}.status`]: newStatus,
      visaStatus: newStatus,
      [`docs.${docType}.docId`]: `${userAccountId}_${docType}`,
      [`docs.${docType}.createdDatetime`]: new Date(),
    };

    if (docType === 'i983') {
      update.$push = { [`docs.${docType}.docUrls`]: docUrl };
    } else {
      update[`docs.${docType}.docUrl`] = docUrl;
    }

    const updatedVisa = await Visa.findOneAndUpdate(
      { userAccountId },
      update,
      { new: true },
    ).exec();

    await UserAccount.findOneAndUpdate(
      { _id: userAccountId },
      { visaStatus: newStatus },
      { new: true },
    );
    await Onboarding.findOneAndUpdate(
      { _id: visa.onboardingId },
      { visaStatus: newStatus },
      { new: true },
    );

    return { error: false, statusCode: 200, data: updatedVisa };
  } catch (error) {
    console.error('Error updating document:', error);
    return { error: true, statusCode: 500, message: error.message };
  }
}

const updateOptReceipt = async (req, res) => {
  const { userAccountId } = req.params;
  const { docUrl } = req.body;

  const result = await updateVisaDocument({
    userAccountId,
    docType: 'optReceipt',
    docTypeName: 'OPT RECEIPT',
    docUrl,
    newStatus: 'OPT RECEIPT-Pending',
  });
  if (result.error) {
    return res.status(result.statusCode).json({ message: result.message });
  }
  res.status(200).json({
    message: 'OPT Receipt updated successfully.',
    OptReceipt: result.data.docs.optReceipt,
  });
};
const updateOptEAD = async (req, res) => {
  const { userAccountId } = req.params;
  const { docUrl } = req.body;

  const result = await updateVisaDocument({
    userAccountId,
    docType: 'optEAD',
    docTypeName: 'OPT EAD',
    docUrl,
    newStatus: 'OPT EAD-Pending',
  });
  if (result.error) {
    return res.status(result.statusCode).json({ message: result.message });
  }
  res.status(200).json({
    message: 'OPT EAD updated successfully.',
    optEAD: result.data.docs.optEAD,
  });
};
const updateI983 = async (req, res) => {
  const { userAccountId } = req.params;
  const { docUrl } = req.body;

  const result = await updateVisaDocument({
    userAccountId,
    docType: 'i983',
    docTypeName: 'I983',
    docUrl,
    newStatus: 'I983-Pending',
  });
  if (result.error) {
    return res.status(result.statusCode).json({ message: result.message });
  }
  res.status(200).json({
    message: 'I983 updated successfully.',
    i983: result.data.docs.i983,
  });
};
const updateI20 = async (req, res) => {
  const { userAccountId } = req.params;
  const { docUrl } = req.body;

  const result = await updateVisaDocument({
    userAccountId,
    docType: 'i20',
    docTypeName: 'I20',
    docUrl,
    newStatus: 'I20-Pending',
  });
  if (result.error) {
    return res.status(result.statusCode).json({ message: result.message });
  }
  res.status(200).json({
    message: 'I20 updated successfully.',
    i20: result.data.docs.i20,
  });
};

const updateVisaDecision = async (req, res) => {
  const { userAccountId, docType } = req.params;
  const { decision, rejFeedback } = req.body;

  const docTypes = ['optReceipt', 'optEAD', 'i983', 'i20'];
  const docTypeNames = ['OPT RECEIPT', 'OPT EAD', 'I983', 'I20'];
  const index = docTypes.indexOf(docType);
  const docTypeName = docTypeNames[index];
  const visaStatus = `${docTypeNames[index]}-${decision}`;
  console.log(visaStatus);
  try {
    const visa = await Visa.findOne({ userAccountId }).exec();
    if (!visa) {
      return res.status(404).json({ message: 'Visa record not found.' });
    }
    const update = {
      [`docs.${docType}.status`]: visaStatus,
    };
    if (decision.includes('Rejected')) {
      update[`docs.${docType}.rejFeedback`] = rejFeedback || 'No feedback provided.';
      update[`docs.${docType}.status`] = visaStatus;
      update.visaStatus = visaStatus;
    }

    const updatedVisa = await Visa.findOneAndUpdate(
      { userAccountId },
      update,
      { new: true },
    ).exec();
    // Determine and update the next document, if applicable
    const nextIndex = index + 1;
    if (nextIndex < docTypes.length) { // Ensure there is a next document
      const nextDocType = docTypes[nextIndex];
      const nextDocTypeName = docTypeNames[nextIndex];
      // Set the next document's status to "Await"

      update[`docs.${nextDocType}.status`] = `${nextDocTypeName}-Await`;
    }
    // Perform the update operation
    const updatedNextVisa = await Visa.findOneAndUpdate(
      { userAccountId },
      update,
      { new: true },
    ).exec();
    if (!updatedNextVisa) {
      return res.status(404).json({ message: 'Visa record not found.' });
    }
    await UserAccount.findOneAndUpdate(
      { _id: userAccountId },
      { visaStatus },
      { new: true },
    );
    await Onboarding.findOneAndUpdate(
      { _id: updatedVisa.onboardingId },
      { visaStatus },
      { new: true },
    );

    // 返回更新后的Visa文档
    return res.status(200).json({
      message: `Visa document ${docTypeName} status updated to ${visaStatus}.`,
      updatedDocument: updatedVisa.docs[docType],
    });
  } catch (error) {
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

export {
  getVisaDetails, getCurrentStep, updateOptReceipt, updateOptEAD, updateI983,
  updateI20, updateVisaDecision, getAll,
};
