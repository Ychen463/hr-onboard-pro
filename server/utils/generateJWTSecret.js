import jwt from 'jsonwebtoken';

const generateJwtToken = (id, username, userRole) => {
  const token = jwt.sign({ id, username, userRole }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '72h',
  });
  return token;
};

export default generateJwtToken;
