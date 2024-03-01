import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const visaSchema = new Schema({
  userAccountId: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
  userProfileId: { type: Schema.Types.ObjectId, ref: 'UserProfile' },
  onboardingId: { type: Schema.Types.ObjectId, ref: 'Onboarding' },
  docs: {
    optReceipt: {
      docId: String,
      docUrl: String,
      rejFeedback: String,
      createdDatetime: Date,
      status: {
        type: String,
        default: 'OPT RECEPT-Await', // "Await" | "Pending" | "Approved" | "Rejected"
      },
    },
    optEAD: {
      docId: String,
      docUrl: String,
      rejFeedback: String,
      createdDatetime: Date,
      status: {
        type: String,
        default: '', // "Await" | "Pending" | "Approved" | "Rejected"
      },
    },
    i983: {
      docId: String,
      docUrl: String,
      rejFeedback: String,
      createdDatetime: Date,
      status: {
        type: String,
        default: '', // "Await" | "Pending" | "Approved" | "Rejected"
      },
    },
    i20: {
      docId: String,
      docUrl: String,
      rejFeedback: String,
      createdDatetime: Date,
      status: {
        type: String,
        default: '', // "Await" | "Pending" | "Approved" | "Rejected"
      },
    },
  },
  visaStatus: {
    type: String,
    default: 'Not Applicable', // "Await" | "Pending" | "Approved" | "Rejected"
  },
});

export default model('Visa', visaSchema);
