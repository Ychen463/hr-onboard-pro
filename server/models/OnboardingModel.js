import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const addressSchema = new Schema({
  streetName: String,
  buildingApt: String,
  city: String,
  state: String,
  zip: String,
});

const carInfoSchema = new Schema({
  make: String,
  model: String,
  color: String,
});

const workAuthFileSchema = new Schema({
  documentId: Schema.Types.ObjectId,
  docUrl: String,
});

const startEndDateSchema = new Schema({
  startDate: Date,
  endDate: Date,
});
const contactSchema = new Schema({
  cellPhoneNumber: String,
  workPhoneNumber: String,
});
const personalInfoSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  preferredName: String,
  profilePictureUrl: String,
  currentAddress: addressSchema, // Using the addressSchema
  contactSchema, // Using the contactSchema
  carInformation: carInfoSchema, // Using the carInfoSchema
  ssn: String,
  dateOfBirth: Date,
  gender: String, // "Male", "Female", "I do not wish to answer"
});

const citizenshipStatusSchema = new Schema({
  isCitizenOrPermanentResident: Boolean,
  statusDetail: String, // "Green Card", "Citizen", or "None"
  workAuthorization: String, // "H1-B", "L2", "F1(CPT/OPT)", "H4", "Other"
  workAuthorizationOtherTitle: String, // If "Other" is selected
  workAuthorizationFiles: [workAuthFileSchema], // Array of workAuthFileSchema
  startEndDate: startEndDateSchema,
});

const driverLicenseSchema = new Schema({
  DocId: Schema.Types.ObjectId,
  hasDriverLicense: Boolean,
  driverLicenseNumber: String,
  expirationDate: Date,
  driverLicenseCopyUrl: String,
});

const referralSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  relationship: String,
});

const emergencyContactSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  relationship: String,
});

const onboardingSchema = new Schema({
  userAccountId: { type: Schema.Types.ObjectId, ref: 'UserAccountModel' },
  applicationStatus: String,
  rejFeedback: String,
  personalInfo: personalInfoSchema,
  citizenshipStatus: citizenshipStatusSchema,
  driverLicense: driverLicenseSchema,
  referral: referralSchema,
  emergencyContacts: [emergencyContactSchema],
});

const Onboarding = model('Onboarding', onboardingSchema);

export default Onboarding;
