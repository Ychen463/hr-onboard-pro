import jwt from 'jsonwebtoken';
import path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

<<<<<<< HEAD
=======
// const { dirname } = import.meta;
// dotenv.config(path.join(dirname, '../.env'));

>>>>>>> b76bceac (partial Onboarding, rebase with dev)
const dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(dirname, '../.env') });

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
