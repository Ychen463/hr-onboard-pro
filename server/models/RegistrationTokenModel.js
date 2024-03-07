import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const registrationTokenSchema = new Schema({
  email: { type: String, required: true },
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  registrationLink: { type: String, required: true },
  token: { type: String, required: true },
  tokenStatus: {
    type: String,
    required: true,
    enum: ['Unused', 'Used', 'Expired'],
  },
  createdDatetime: { type: Date, default: Date.now },
  usedDatetime: { type: Date },
});

const RegistrationToken = model('RegistrationToken', registrationTokenSchema);

export default RegistrationToken;
