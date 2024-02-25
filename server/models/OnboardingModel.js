import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const addressSchema = new Schema({
  streetName: String,
  buildingApt: String,
  city: String,
  state: String,
  zip: String,
}, { _id: false });

const carInfoSchema = new Schema({
  make: String,
  model: String,
  color: String,
}, { _id: false });

const workAuthFileSchema = new Schema({
  docId: String,
  docUrl: String,
}, { _id: false });

const startEndDateSchema = new Schema({
  startDate: Date,
  endDate: Date,
}, { _id: false });
const contactSchema = new Schema({
  cellPhoneNumber: String,
  workPhoneNumber: String,
}, { _id: false });
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
}, { _id: false });

const citizenshipStatusSchema = new Schema({
  isCitizenOrPermanentResident: Boolean,
  statusDetail: String, // "Green Card", "Citizen", or "None"
  workAuthorization: String, // "H1-B", "L2", "F1(CPT/OPT)", "H4", "Other"
  workAuthorizationOtherTitle: String, // If "Other" is selected
  workAuthorizationFiles: [workAuthFileSchema], // Array of workAuthFileSchema
  startEndDate: startEndDateSchema,

}, { _id: false });

const driverLicenseSchema = new Schema({
  DocId: Schema.Types.ObjectId,
  hasDriverLicense: Boolean,
  driverLicenseNumber: String,
  expirationDate: Date,
  driverLicenseCopyUrl: String,
}, { _id: false });

const referralSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  relationship: String,
}, { _id: false });

const emergencyContactSchema = new Schema({
  firstName: String,
  lastName: String,
  middleName: String,
  phone: String,
  email: String,
  relationship: String,
}, { _id: false });

const onboardingSchema = new Schema({
  userAccountId: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
  registrationEmail: String,
  onboardingStatus: String,
  rejFeedback: String,
  personalInfo: personalInfoSchema,
  citizenshipStatus: citizenshipStatusSchema,
  driverLicense: driverLicenseSchema,
  referral: referralSchema,
  emergencyContacts: [emergencyContactSchema],
  visaId: { type: Schema.Types.ObjectId, ref: 'Visa', required: false },

});

const Onboarding = model('Onboarding', onboardingSchema);

export default Onboarding;
