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

const driverLicenseSchema = new Schema({
  DocId: Schema.Types.ObjectId,
  hasDriverLicense: Boolean,
  driverLicenseNumber: String,
  expirationDate: Date,
  driverLicenseCopyUrl: String,
});

const emergencyContactSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  relationship: String,
});

const userProfileSchema = new Schema({
  userAccountId: { type: Schema.Types.ObjectId, ref: 'UserAccountModel', required: true },
  onboardingId: { type: Schema.Types.ObjectId, ref: 'OnboardingModel', required: true },
  personalInfo: personalInfoSchema,
  employmentStatus: String, // “Onboarding”, "Active", "Inactive"
  driverLicense: driverLicenseSchema,
  emergencyContacts: [emergencyContactSchema],
});

const UserProfile = model('UserProfile', userProfileSchema);

export default UserProfile;
