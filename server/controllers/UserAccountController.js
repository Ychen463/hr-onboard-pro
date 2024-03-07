// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import validator from 'validator';
// eslint-disable-next-line import/no-extraneous-dependencies
import passwordValidator from 'password-validator';
import generateLoginToken from '../utils/generateLoginToken.js';
import UserAccount from '../models/UserAccountModel.js';
import RegistrationToken from '../models/RegistrationTokenModel.js';
import Housing from '../models/HousingModel.js';

// eslint-disable-next-line new-cap
const schema = new passwordValidator();

const SALT = parseInt(process.env.SALT, 10);

schema
  .is()
  .min(8) // Minimal 9 letter
  .has()
  .uppercase()
  .has()
  .lowercase() // Must have Upper, Lower Case
  .has()
  .digits() // Must have ditgits
  .has()
  .symbols() // Must have Specail symbol
  .is()
  .not()
  .oneOf(['Passw0rd', 'Password123']); // Password not allwed

const register = async (req, res) => {
  try {
    const { username } = req.body;
    const { password } = req.body;
    let { email } = req.user;
    const hashedPassword = await bcrypt.hash(password, SALT);

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(422).json({ message: 'Invalid email format' });
    }

    // Sanitize email and username
    email = validator.normalizeEmail(email);
    // username = validator.escape(username);

    // Password validation
    if (!schema.validate(password)) {
      return res.status(422).json({ message: 'Password does not meet complexity requirements' });
    }

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

    // Find RegistrationToken

    const registrationToken = await RegistrationToken.findOne({ email }).lean().exec();
    console.log(email);

    const savedUserAccount = await UserAccount.create({
      username,
      email,
      userRole: 'employee',
      password: hashedPassword,
      housingId: assignedHousing._id,
      registrationTokenId: registrationToken._id,
    });

    // Update the registration token status
    const updatedRegistrationToken = await RegistrationToken.findOneAndUpdate(
      { email },
      { $set: { tokenStatus: 'Used' } },
      { new: true }
    ).exec();
    if (!updatedRegistrationToken) {
      return res.status(404).json({ message: 'Registration token not found.' });
    }

    // Update the housing's residents field
    const updatedHousing = await Housing.findByIdAndUpdate(
      assignedHousing._id,
      { residents: [...assignedHousing.residents, savedUserAccount._id] },
      { new: true }
    ).exec();
    if (!updatedHousing) {
      return res.status(404).json({ message: 'Update housing residents failed.' });
    }

    // Generate login JWT
    const loginJwtToken = generateLoginToken(
      savedUserAccount._id,
      savedUserAccount.username,
      savedUserAccount.userRole
    );

    return res.status(201).json({
      message: 'User registered successfully, logged in successfully',
      loginJwtToken,
      user: {
        userId: savedUserAccount._id,
        username: savedUserAccount.username,
        userRole: savedUserAccount.userRole,
        email: savedUserAccount.email,
        housingId: assignedHousing._id,
        onboardingStatus: savedUserAccount.onboardingStatus,
        visaStatus: savedUserAccount.visaStatus,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const userAccount = await UserAccount.findOne({
      username: req.body.username,
    });
    if (!userAccount) {
      return res.status(404).json({ message: 'User not found: Invalid username' });
    }
    const isMatch = await bcrypt.compare(req.body.password, userAccount.password);
    if (!isMatch) {
      return res.status(422).json({ message: 'Invalid password credentials' });
    }
    // Generate login JWT
    const loginJwtToken = generateLoginToken(
      userAccount._id,
      userAccount.username,
      userAccount.userRole
    );
    return res.status(200).json({
      message: `User: ${userAccount.username} login successful`,
      loginJwtToken,
      user: {
        userId: userAccount._id,
        username: userAccount.username,
        userRole: userAccount.userRole,
        email: userAccount.email,
        housingId: userAccount.housingId,
        onboardingStatus: userAccount.onboardingStatus,
        visaStatus: userAccount.visaStatus,
      },
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
        email: userAccount.email,
        housingId: userAccount.housingId,
        onboardingStatus: userAccount.onboardingStatus,
        visaStatus: userAccount.visaStatus,
      },
      loginStatus: 'Logged In',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking user token', error: error.message });
  }
};

export { register, login, validateSession };
