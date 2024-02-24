import jwt from 'jsonwebtoken';
import validator from 'validator';

const jwtVerifyToken = (req, res, next) => {
  let token;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer ')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }
  if (!token || validator.isEmpty(token)) {
    return res.status(401).json({
      message: `${req.headers.authorization} No token provided`,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded.id || !validator.isMongoId(decoded.id)) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
};

export default jwtVerifyToken;
