import mongoose from 'mongoose';

const userAccountSchema = new mongoose.Schema({
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
  OnboardingStatus: {
    type: String,
    default: 'Not Started',
  },
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

export default UserAccount;
