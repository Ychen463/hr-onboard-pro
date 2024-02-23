/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import RegistrationToken from '../models/RegistrationTokenModel.js';
import generateRegisterToken from '../utils/generateRegisterToken.js';
import sendEmail from '../utils/sendEmail.js';

const generateRegiToken = async (req, res) => {
  try {
    const { userFirstName, userLastName, email } = req.body;
    const userEmailExists = await RegistrationToken.findOne({ email }).lean().exec();
    // Registration Email should not be used before
    if (userEmailExists) {
      return res.status(409).json({ message: 'Register Email already exists' });
    }
    const jwtToken = generateRegisterToken(userFirstName, userLastName, email, 'employee');
    const registrationLink = `${process.env.DOMAIN_NAME}/register?token=${jwtToken}`;
    const tokenInfo = {
      userFirstName,
      userLastName,
      email,
      token: jwtToken,
      tokenStatus: 'Unused',
      createdDatetime: Date.now(),
      registrationLink,
    };
    const savedTokenInfo = await RegistrationToken.create(tokenInfo);

    // Send out the email to new employee
    await sendEmail({
      toEmail: email,
      subject: 'Onboarding Registration Link',
      htmlBody: `<h4>Hi ${userFirstName},</h4>
                   <p>Please click on the link below to complete your onboarding registration:</p>
                   <a href="${registrationLink}">${registrationLink}</a>
                   <p>This link will expire in 3 hours.</p>`,
    });

    res.status(201).json({
      message: 'Registration Token generated successfully',
      registrationLink: savedTokenInfo.registrationLink,
      userFirstName,
      userLastName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTokenStatus = async (req, res) => {
  try {
    const { token } = req.params;
    const statusUpdate = {
      tokenStatus: 'Used',
      usedDatetime: Date.now(),
    };
    const updatedToken = await RegistrationToken.findOneAndUpdate(
      { token },
      statusUpdate,
      { new: true },
    );
    if (!updatedToken) {
      return res.status(404).json({ message: 'Token not found' });
    }
    res.json({ message: 'Token updated successfully', updatedToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTokenStatus = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenRecord = await RegistrationToken.findOne({ token });
    if (!tokenRecord) {
      return res.status(404).json({ message: 'Token not found' });
    }
    const currentTime = new Date();
    const threeHoursInMilliseconds = 3 * 60 * 60 * 1000;
    const timeElapsed = currentTime - tokenRecord.createdDatetime;
    if (timeElapsed > threeHoursInMilliseconds && tokenRecord.tokenStatus === 'Unused') {
      tokenRecord.tokenStatus = 'Expired';
      await tokenRecord.save(); // Saved 'Expired' Status
    }

    res.json({
      token: tokenRecord.token,
      status: tokenRecord.tokenStatus,
      userFirstName: tokenRecord.userFirstName,
      userLastName: tokenRecord.userLastName,
      email: tokenRecord.email,
      createdDatetime: tokenRecord.createdDatetime,
      usedDatetime: tokenRecord.usedDatetime,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { generateRegiToken, updateTokenStatus, getTokenStatus };
