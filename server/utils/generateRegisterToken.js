import jwt from 'jsonwebtoken';
import path from 'path';
import * as dotenv from 'dotenv';

const { dirname } = import.meta;
dotenv.config(path.join(dirname, '../.env'));

const generateRegisterToken = (userFirstName, userLastName, email, userRole) => {
  const token = jwt.sign(
    {
      userFirstName, userLastName, email, userRole,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '3h',
    },
  );
  return token;
};

export default generateRegisterToken;
