import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const documentSchema = new Schema({
  optReceiptId: String,
  docUrl: String,
  rejFeedback: String,
  createdDatetime: Date,
  status: String, // "Await" | "Pending" | "Approved" | "Rejected"
});

const visaSchema = new Schema({
  userAccountId: { type: Schema.Types.ObjectId, ref: 'UserAccountModel' },
  userProfileId: { type: Schema.Types.ObjectId, ref: 'UserProfileModel' },
  onboardingId: { type: Schema.Types.ObjectId, ref: 'OnboardingModel' },
  docs: {
    optReceipt: documentSchema,
    optEAD: documentSchema,
    i983: {
      i983Id: String,
      docUrls: [String],
      rejFeedback: String,
      createdDatetime: Date,
      status: String,
    },
    i20: documentSchema,
  },
  overallStatus: String,
  nextStep: String,
});

export default model('Visa', visaSchema);
