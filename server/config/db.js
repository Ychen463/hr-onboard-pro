import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

const filename = fileURLToPath(import.meta.url);

const dirName = dirname(filename);

dotenv.config(path.join(dirName, '../.env'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error(err));

export default mongoose.connection;
