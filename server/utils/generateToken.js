import jwt from "jsonwebtoken";
import path from "path";
import * as dotenv from "dotenv";

const __dirname = import.meta.dirname;
dotenv.config(path.join(__dirname, "../.env"));

// to be decided, what to put as arguments for token
const generateToken = (userId, email, userRole) => {
  const token = jwt.sign(
    { userId, email, userRole },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export default generateToken;
