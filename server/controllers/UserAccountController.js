// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import generateLoginToken from '../utils/generateLoginToken.js';

import UserAccount from '../models/UserAccountModel.js';
import RegistrationToken from '../models/RegistrationTokenModel.js';
import Housing from '../models/HousingModel.js';

const SALT = parseInt(process.env.SALT, 10);

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT);
    // Check if email already exists
    const userEmailExists = await UserAccount.findOne({ email }).lean().exec();
    if (userEmailExists) {
      return res.status(409).json({ message: 'Register Email already exists' });
    }
    // Check if username already exists
    const userNameExists = await UserAccount.findOne({ username }).lean().exec();
    if (userNameExists) {
      return res.status(409).json({ message: 'Register Username already exists' });
    }
    // Randomly assign a housing from Housing schema
    const housings = await Housing.find().lean().exec();
    if (!housings.length) {
      return res.status(500).json({ message: 'No housing available for assignment.' });
    }
    const randomIndex = Math.floor(Math.random() * housings.length);
    const assignedHousing = housings[randomIndex];

    const { registrationEmail } = req.user;
    console.log(assignedHousing._id);
    const savedUserAccount = await UserAccount.create({
      username,
      email,
      registrationEmail,
      userRole: 'employee',
      password: hashedPassword,
      housingId: assignedHousing._id,
    });

    // Update the registration token status
    const updatedRegistrationToken = await RegistrationToken.findOneAndUpdate(
      { email: registrationEmail },
      { $set: { tokenStatus: 'Used' } },
      { new: true },
    ).exec();
    if (!updatedRegistrationToken) {
      return res.status(404).json({ message: 'Registration token not found.' });
    }

    // Generate login JWT
    const loginJwtToken = generateLoginToken(
      savedUserAccount._id,
      savedUserAccount.username,
      'employee',
    );

    return res.status(201).json({
      message: 'User registered successfully, logged in successfully',
      username: savedUserAccount.username,
      email,
      housingID: assignedHousing._id,
      loginJwtToken,
      visaStatus: savedUserAccount.visaStatus,
      onboardingStatus: savedUserAccount.onboardingStatus,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const userAccount = await UserAccount.findOne({ username: req.body.username });
    if (!userAccount) {
      return res
        .status(404)
        .json({ message: 'User not found: Invalid username' });
    }
    const isMatch = await bcrypt.compare(req.body.password, userAccount.password);
    if (!isMatch) {
      return res.status(422).json({ message: 'Invalid password credentials' });
    }
    // Generate login JWT
    const loginJwtToken = generateLoginToken(
      userAccount._id,
      userAccount.username,
      userAccount.userRole,
    );
    return res.status(200).json({
      message: `User: ${userAccount.username} login successful`,
      username: userAccount.username,
      userRole: userAccount.userRole,
      visaStatus: userAccount.visaStatus,
      onboardingStatus: userAccount.onboardingStatus,
      loginJwtToken,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
// VALIDATE SESSION
const validateSession = async (req, res) => {
  try {
    const userAccount = await UserAccount.findOne({ _id: req.user.userId });
    console.log();
    res.status(200).json({
      message: 'Session is valid',
      user: {
        userId: req.user.userId,
        username: req.user.username,
        userRole: req.user.userRole,
        loginStatus: 'Logged In',
        visaStatus: userAccount.visaStatus,
        onboardingStatus: userAccount.onboardingStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking user token', error: error.message });
  }
};

export { register, login, validateSession };