import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

dotenv.config(path.join(__dirname, "../.env"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error(err));

export default mongoose.connection;
