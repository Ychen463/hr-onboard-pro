import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import RegistrationToken from '../models/RegistrationTokenModel.js';
import UserAccount from '../models/UserAccountModel.js';
import connection from './db.js';

dotenv.config(); // 加载环境变量

const SALT_ROUNDS = parseInt(process.env.SALT, 10) || 10;

const seedRegistrationTokens = async () => {
  const tokens = [
    {
      email: 'example@example.com',
      userFirstName: 'John',
      userLastName: 'Doe',
      registrationLink: 'https://example.com/register',
      token: 'someUniqueToken123',
      tokenStatus: 'Unused',
      createdDatetime: new Date(),
      usedDatetime: null,
    },
    // add more tokens
  ];

  try {
    await RegistrationToken.deleteMany();
    await RegistrationToken.insertMany(tokens);
    console.log('RegistrationToken Data Seeded Successfully');
  } catch (error) {
    console.error('Error seeding RegistrationToken data: ', error);
  }
};

const seedUserAccounts = async () => {
  const userAccounts = [
    {
      username: 'john.doe',
      password: await bcrypt.hash('password123', SALT_ROUNDS),
      email: 'john.doe@example.com',
      role: 'employee',
    },
    // add more account users
  ];

  try {
    await UserAccount.deleteMany();
    await UserAccount.insertMany(userAccounts);
    console.log('UserAccount Data Seeded Successfully');
  } catch (error) {
    console.error('Error seeding UserAccount data: ', error);
  }
};

const seedDatabase = async () => {
  try {
    await connection.openUri(process.env.MONGO_URI);
    console.log('Connected to Database');

    await seedRegistrationTokens();
    await seedUserAccounts(); //
  } catch (error) {
    console.error('Error seeding data: ', error);
  } finally {
    await connection.close();
    console.log('Database connection closed');
  }
};

seedDatabase();
