import jwt from 'jsonwebtoken';

const generateJwtToken = (id, username, role) => {
  const token = jwt.sign({ id, username, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '72h',
  });
  return token;
};

export default generateJwtToken;
