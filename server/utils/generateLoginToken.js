import jwt from 'jsonwebtoken';

const generateLoginToken = (id, username, userRole) => {
  const token = jwt.sign({ id, username, userRole }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '300h',
  });
  return token;
};

export default generateLoginToken;
