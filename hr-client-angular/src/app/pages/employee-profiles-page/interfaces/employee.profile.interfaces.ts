import { ObjectId } from 'mongodb';

interface PhoneNumbers {
  cellPhoneNumber: string;
  workPhoneNumber?: string;
}

interface Address {
  streetName: string;
  buildingApt: string;
  city: string;
  state: string;
  zip: string;
}

interface CarInformation {
  make: string;
  model: string;
  color: string;
}

interface WorkAuthorizationFile {
  docId: string;
  docUrl: string;
}

interface StartEndDate {
  startDate: Date;
  endDate: Date;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  profilePictureUrl?: string;
  currentAddress: Address;
  contactSchema: PhoneNumbers;
  carInformation?: CarInformation;
  ssn: string;
  dateOfBirth: string;
  gender?: string;
}

interface CitizenshipStatus {
  isCitizenOrPermanentResident: string;
  statusDetail?: string;
  workAuthorization?: string;
  workAuthorizationOtherTitle?: string;
  workAuthorizationFiles?: WorkAuthorizationFile[];
  startEndDate?: StartEndDate;
}

interface DriverLicense {
  DocId: ObjectId;
  hasDriverLicense: boolean;
  driverLicenseNumber?: string;
  expirationDate?: Date;
  driverLicenseCopyUrl?: string;
}

interface EmergencyContact {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface ProfileSummary {
  userProfileId: ObjectId;
  userAccountId: ObjectId;
  email: string;
  workAuthorization: string;
  firstName: string;
  lastName: string;
  preferredName?: string;
  phoneNumber: PhoneNumbers;
  ssn: string;
}

export interface FullProfile {
  _id: ObjectId;
  personalInfo: PersonalInfo;
  employmentStatus: string;
  citizenshipStatus: CitizenshipStatus;
  driverLicense: DriverLicense;
  emergencyContacts: EmergencyContact[];
  email: string;
  __v: number;
}

export interface ProfileSummaryResponse {
  message: string;
  profileList?: ProfileSummary[];
}

export interface FullProfileResponse {
  message: string;
  profile?: FullProfile;
}
