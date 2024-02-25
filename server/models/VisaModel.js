import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const documentSchema = new Schema({
  docId: String,
  docUrl: String,
  rejFeedback: String,
  createdDatetime: Date,
  status: {
    type: String,
    default: 'Await', // "Await" | "Pending" | "Approved" | "Rejected"
  },
}, { _id: false });

const visaSchema = new Schema({
  userAccountId: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
  userProfileId: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
  onboardingId: { type: Schema.Types.ObjectId, ref: 'Onboarding' },
  docs: {
    optReceipt: documentSchema,
    optEAD: documentSchema,
    i983: {
      docId: String,
      docUrls: [String],
      rejFeedback: String,
      createdDatetime: Date,
      status: {
        type: String,
        default: 'Await', // "Await" | "Pending" | "Approved" | "Rejected"
      },
    },
    i20: documentSchema,
  },
  visaStatus: String,
});

export default model('Visa', visaSchema);
