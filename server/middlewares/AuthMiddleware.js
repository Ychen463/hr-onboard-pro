import jwt from 'jsonwebtoken';
import validator from 'validator';

const jwtVerifyToken = (req, res, next) => {
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
  if (!decoded.id || !validator.isMongoId(decoded.id)) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  req.user = req.user || {};
  req.user.userId = decoded.id;
  req.user.username = decoded.username;
  req.user.userRole = decoded.userRole;
  next();
};

export default jwtVerifyToken;
