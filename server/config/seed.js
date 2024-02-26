// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import RegistrationToken from '../models/RegistrationTokenModel.js';
import UserAccount from '../models/UserAccountModel.js';
import Onboarding from '../models/OnboardingModel.js';
import UserProfile from '../models/UserProfileModel.js';
import Housing from '../models/HousingModel.js';
import Visa from '../models/VisaModel.js';

import connection from './db.js';
import FacilityReport from '../models/FacilityReportModel.js';

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT, 10) || 10;

const seedHousing = async () => {
  const account = await UserAccount.find().select('_id').lean().exec(); // get one account as testing resident
  const housings = [
    {
      name: 'Sunny Apartments',
      address: '123 Sunny Road, Sunville',
      landlord: {
        fullName: 'John Doe',
        phoneNumber: '123-456-7890',
        email: 'johndoe@example.com',
      },
      residents: [], // Assuming no residents initially
      facilityInfo: {
        beds: 4, mattresses: 4, tables: 1, chairs: 4,
      },
    },
    {
      name: 'Rainy Apartments',
      address: '124 Sunny Road, Sunville',
      landlord: {
        fullName: 'John Doe',
        phoneNumber: '123-456-7890',
        email: 'johndoe@example.com',
      },
      residents: [account[0]], // Assuming this house has one resident
      facilityInfo: {
        beds: 4, mattresses: 4, tables: 1, chairs: 4,
      },
    },
  ];

  try {
    await Housing.deleteMany();
    await Housing.insertMany(housings);
    const firstHousing = await Housing.findOne().lean(); // Fetch the first one as an example
    console.log('Housing Data Seeded Successfully');
    return firstHousing._id; // Return its ID
  } catch (error) {
    console.error('Error seeding Housing data: ', error);
  }
};

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
    {
      email: 'example2@example.com',
      userFirstName: 'John2',
      userLastName: 'Doe2',
      registrationLink: 'https://example2.com/register',
      token: 'someUniqueToken12322',
      tokenStatus: 'Unused',
      createdDatetime: new Date(),
      usedDatetime: null,
    },
  ];

  try {
    await RegistrationToken.deleteMany();
    await RegistrationToken.insertMany(tokens);
    const firstToken = await RegistrationToken.findOne().lean();
    console.log('RegistrationToken Data Seeded Successfully');
    return firstToken._id; // Return its ID
  } catch (error) {
    console.error('Error seeding RegistrationToken data: ', error);
  }
};

const seedUserAccounts = async (registrationTokenId, housingId) => {
  const userAccounts = [
    {
      username: 'john.doe',
      password: await bcrypt.hash('password123', SALT_ROUNDS),
      email: 'aaa@aa.com',
      userRole: 'employee',
      onboardingStatus: 'Not Started',
      visaStatus: 'Not Applicable',
      housingId,
      registrationTokenId,
    },

  ];

  try {
    await UserAccount.deleteMany();
    await UserAccount.insertMany(userAccounts);
    console.log('UserAccount Data Seeded Successfully');
  } catch (error) {
    console.error('Error seeding UserAccount data: ', error);
  }
};

const seedOnboardings = async () => {
  const onboardings = [{
    userAccountId: new mongoose.Types.ObjectId(),
    email: 'abc@abc.com',
    onboardingStatus: 'Not Started',
    rejFeedback: '',
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      preferredName: '',
      profilePictureUrl: 'https://example.com/profile.jpg',
      currentAddress: {
        streetName: '123 Main St',
        buildingApt: 'Apt 101',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
      },
      cellPhoneNumber: '123-456-7890',
      workPhoneNumber: '',
      carInformation: {
        make: 'Toyota',
        model: 'Camry',
        color: 'Blue',
      },
      ssn: '123-45-6789',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
    },
    citizenshipStatus: {
      isCitizenOrPermanentResident: true,
      statusDetail: 'Citizen',
      workAuthorization: 'None',
      workAuthorizationOtherTitle: '',
      workAuthorizationFiles: [],
      startEndDate: {
        startDate: '2022-01-01',
        endDate: '2022-12-31',
      },
    },
    driverLicense: {
      DocId: new mongoose.Types.ObjectId(),
      hasDriverLicense: true,
      driverLicenseNumber: '123456789',
      expirationDate: '2025-01-01',
      driverLicenseCopyUrl: 'https://example.com/driver_license.jpg',
    },
    referral: {
      firstName: 'Jane',
      lastName: 'Smith',
      middleName: '',
      phone: '987-654-3210',
      email: 'jane@example.com',
      relationship: 'Friend',
    },
    emergencyContacts: [{
      firstName: 'Emergency',
      lastName: 'Contact',
      middleName: '',
      phone: '555-555-5555',
      email: 'emergency@example.com',
      relationship: 'Family',
    }],
    visaId: new mongoose.Types.ObjectId(),
  }];

  try {
    await Onboarding.deleteMany();
    await Onboarding.insertMany(onboardings);
    console.log('Onboarding Data Seeded Successfully');
  } catch (error) {
    console.error('Error seeding Onboarding data: ', error);
  }
};
const seedUserProfiles = async () => {
  const userProfiles = [{
    userAccountId: new mongoose.Types.ObjectId(), // Assuming you have user accounts created
    onboardingId: new mongoose.Types.ObjectId(), // Assuming you have onboarding records created
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      preferredName: 'Johnny',
      profilePictureUrl: 'https://example.com/path/to/profile/pic.jpg',
      currentAddress: {
        streetName: '123 Main St',
        buildingApt: 'Apt 4',
        city: 'Anytown',
        state: 'Anystate',
        zip: '12345',
      },
      contactSchema: {
        cellPhoneNumber: '123-456-7890',
        workPhoneNumber: '098-765-4321',
      },
      carInformation: {
        make: 'Make',
        model: 'Model',
        color: 'Color',
      },
      ssn: '123-45-6789',
      dateOfBirth: new Date(1990, 0, 1), // Jan 1, 1990
      gender: 'Male',
    },
    employmentStatus: 'Onboarding',
    citizenshipStatus: {
      isCitizenOrPermanentResident: true,
      statusDetail: 'Citizen',
      workAuthorization: 'F1(CPT/OPT)',
      workAuthorizationOtherTitle: '',
      workAuthorizationFiles: [],
      startEndDate: {
        startDate: '2022-01-01',
        endDate: '2022-12-31',
      },
    },
    driverLicense: {
      DocId: new mongoose.Types.ObjectId(),
      hasDriverLicense: true,
      driverLicenseNumber: 'D1234567',
      expirationDate: new Date(2025, 11, 31), // Dec 31, 2025
      driverLicenseCopyUrl: 'https://example.com/path/to/license/copy.jpg',
    },
    emergencyContacts: [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '123-456-7890',
        email: 'jane.doe@example.com',
        relationship: 'Spouse',
      },
    ],
  }];
  try {
    await UserProfile.deleteMany();
    await UserProfile.insertMany(userProfiles);
    console.log('UserProfile Data Seeded Successfully');
  } catch (error) {
    console.error('Error seeding UserProfile data: ', error);
  }
};

const seedVisas = async () => {
  const visas = [
    {
      // Placeholder, replace with actual UserAccount ID
      userAccountId: new mongoose.Types.ObjectId(),
      // Placeholder, replace with actual UserProfile ID
      userProfileId: new mongoose.Types.ObjectId(),
      // Placeholder, replace with actual Onboarding ID
      onboardingId: new mongoose.Types.ObjectId(),
      docs: {
        optReceipt: {
          optReceiptId: '1234-optreceipt',
          docUrl: 'http://example.com/optReceipt.pdf',
          rejFeedback: '',
          createdDatetime: new Date(),
          status: 'Pending',
        },
        optEAD: {
          optReceiptId: '1234-optead',
          docUrl: 'http://example.com/optEAD.pdf',
          rejFeedback: '',
          createdDatetime: new Date(),
          status: 'Await',
        },
        i983: {
          i983Id: '1234-i983',
          docUrl: 'http://example.com/i983.pdf',
          rejFeedback: '',
          createdDatetime: new Date(),
          status: 'Pending',
        },
        i20: {
          optReceiptId: '1234-i20',
          docUrl: 'http://example.com/i20.pdf',
          rejFeedback: '',
          createdDatetime: new Date(),
          status: 'Approved',
        },
      },
      overallStatus: 'AllDocs-Await',
    },
  ];

  try {
    await Visa.deleteMany();
    await Visa.insertMany(visas);
    console.log('Visa data seeded successfully.');
  } catch (error) {
    console.error('Failed to seed Visa data:', error);
  }
};
const seedFacilityReports = async () => {
  const reports = [
    {
      housing: new mongoose.Types.ObjectId(),
      title: 'Broken Window',
      description: 'The window in the living room is broken.',
      createdBy: new mongoose.Types.ObjectId(),
      createdDatetime: new Date(),
      status: 'Open',
      comments: [
        {
          description: 'Report has been acknowledged.',
          createdBy: new mongoose.Types.ObjectId(),
          lastModifiedDatetime: new Date(),
        },
      ],
    },
  ];

  try {
    await FacilityReport.deleteMany();
    await FacilityReport.insertMany(reports);
    console.log('Facility reports seeded successfully.');
  } catch (error) {
    console.error('Failed to seed facility reports:', error);
  }
};

const seedDatabase = async () => {
  try {
    await connection.openUri(process.env.MONGO_URI);
    console.log('Connected to Database');
    const registrationTokenId = await seedRegistrationTokens();
    const housingId = await seedHousing();
    await seedUserAccounts(registrationTokenId, housingId);
    await seedOnboardings();
    await seedUserProfiles();

    await seedVisas();
    await seedFacilityReports();
  } catch (error) {
    console.error('Error seeding data: ', error);
  } finally {
    await connection.close();
    console.log('Database connection closed');
  }
};

seedDatabase();
