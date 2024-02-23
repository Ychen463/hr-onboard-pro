import mongoose from 'mongoose';

const userAccountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  registrationTokenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RegistrationToken',
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
  role: {
    type: String,
    enum: ['employee', 'HR'],
    required: true,
  },
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

export default UserAccount;
