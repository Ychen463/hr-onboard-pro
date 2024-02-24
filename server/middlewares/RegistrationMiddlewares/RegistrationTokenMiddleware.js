import RegistrationToken from '../../models/RegistrationTokenModel.js';

const validateToken = async (req, res, next) => {
  const { token } = req.params;
  const currentTime = new Date();
  const threeHoursInMilliseconds = 3 * 60 * 60 * 1000; // 3h

  try {
    const tokenRecord = await RegistrationToken.findOne({ token });

    if (!tokenRecord) {
      return res.status(404).json({ message: 'Token not found' });
    }
    if (tokenRecord.tokenStatus !== 'Unused') {
      return res.status(400).json({ message: 'Token is already used or expired' });
    }
    if (tokenRecord.usedDatetime) {
      return res.status(400).json({ message: 'Token is already used' });
    }
    const timeElapsed = currentTime - tokenRecord.createdDatetime;
    if (timeElapsed > threeHoursInMilliseconds) {
      tokenRecord.tokenStatus = 'Expired';
      await tokenRecord.save();
      return res.status(400).json({ message: 'Token has expired' });
    }
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default validateToken;
