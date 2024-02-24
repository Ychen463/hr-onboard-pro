/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import bcrypt from 'bcrypt';
import generateJWtToken from '../utils/generateJWTSecret.js';
import UserAccount from '../models/UserAccountModel.js';
import RegistrationToken from '../models/RegistrationTokenModel.js';

const SALT = parseInt(process.env.SALT, 10);

// REGISTER
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
    // eslint-disable-next-line no-multi-spaces
    const  registrationEmail  = req.user.registrationEmail;
    const savedUserAccount = await UserAccount.create({
      username,
      email,
      registrationEmail,
      userRole: 'employee',
      password: hashedPassword,
    });
    // update the registration token status
    const updatedRegistrationToken = await RegistrationToken.findOneAndUpdate(
      { email: registrationEmail },
      { $set: { tokenStatus: 'Used' } },
      { new: true },
    ).exec();
    if (!updatedRegistrationToken) {
      return res.status(404).json({ message: 'Registration token not found.' });
    }
    // Generate login JWT
    const loginJwtToken = generateJWtToken(
      savedUserAccount._id,
      savedUserAccount.username,
      'employee',
    );
    return res.status(201).json({
      message: 'User registered successfully, logged in successfully',
      username: savedUserAccount.username,
      email,
      loginJwtToken,
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
    const userRole = 'employee';
    const jwtToken = generateJWtToken(
      userAccount._id,
      userAccount.username,
      userRole,
    );
    res.status(200).json({
      message: `User: ${userAccount.username} login successful`,
      username: userAccount.username,
      jwtToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
// VALIDATE SESSION
const validateSession = (req, res) => {
  try {
    res.status(200).json({
      message: 'Session is valid',
      user: {
        userId: req.user.userId,
        username: req.user.username,
        role: req.user.userRole,
        loginStatus: 'Logged In',
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking user token', error: error.message });
  }
};

export { register, login, validateSession };
