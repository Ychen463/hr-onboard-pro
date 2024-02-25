import mongoose from 'mongoose';

const { Schema } = mongoose;
const userAccountSchema = new Schema({
  registrationEmail: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userRole: {
    type: String,
    enum: ['employee', 'HR'],
    required: true,
  },
  onboardingStatus: {
    type: String,
    default: 'Not Started',
  },
  visaStatus: {
    type: String,
    default: 'Not Applicable',
  },
  housingId: { type: Schema.Types.ObjectId, ref: 'Housing', required: true },

});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

export default UserAccount;
