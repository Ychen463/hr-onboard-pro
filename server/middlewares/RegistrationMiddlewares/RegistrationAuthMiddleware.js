import jwt from 'jsonwebtoken';
import validator from 'validator';

const RegiJwtVerifyToken = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token || validator.isEmpty(token)) {
      return res.status(401).json({
        message: `${req.headers.authorization} No token provided`,
      });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = req.user || {};
    req.user.userFirstName = decoded.userFirstName;
    req.user.userLastName = decoded.userLastName;
    req.user.jwtToken = token;
    req.user.email = decoded.email;

    req.user.userRole = decoded.userRole;
    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Error Authentication', error: error.message });
  }
};

export default RegiJwtVerifyToken;
