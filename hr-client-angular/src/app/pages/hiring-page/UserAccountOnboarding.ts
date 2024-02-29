export interface DisplayedOnboardingData {
    onboardingStatus: string;
    name: string;
    email: string;
    userAccountId: string;
}

export interface UserAccountOnboardingData {
    _id: string;
    userAccountId: string;
    email: string;
    onboardingStatus: string;
    rejFeedback: string;
    personalInfo: PersonalInfo;
    citizenshipStatus: CitizenshipStatus;
    driverLicense: DriverLicense;
    referral: Referral;
    emergencyContacts: EmergencyContact[];
    visaId: string;
    __v: number;
    visaInfo: VisaInfo;
  }
  
  interface PersonalInfo {
    firstName: string;
    lastName: string;
    middleName: string;
    preferredName: string;
    profilePictureUrl: string;
    currentAddress: Address;
    contactSchema: ContactSchema;
    carInformation: CarInformation;
    ssn: string;
    dateOfBirth: string;
    gender: string;
  }
  
  interface Address {
    streetName: string;
    buildingApt: string;
    city: string;
    state: string;
    zip: string;
  }
  
  interface ContactSchema {
    cellPhoneNumber: string;
    workPhoneNumber: string;
  }
  
  interface CarInformation {
    make: string;
    model: string;
    color: string;
  }
  
  interface CitizenshipStatus {
    isCitizenOrPermanentResident: boolean;
    statusDetail: string;
    workAuthorization: string;
    workAuthorizationOtherTitle: string;
    workAuthorizationFiles: Document[];
    startEndDate: StartEndDate;
  }
  
  interface StartEndDate {
    startDate: string;
    endDate: string;
  }
  
  interface Document {
    docId: string;
    docUrl: string;
  }
  
  interface DriverLicense {
    DocId: string;
    hasDriverLicense: boolean;
    driverLicenseNumber: string;
    expirationDate: string;
    driverLicenseCopyUrl: string;
  }
  
  interface Referral {
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  }
  
  interface EmergencyContact {
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  }
  
  interface VisaInfo {
    _id: string;
    userAccountId: string;
    docs: {
      optReceipt: DocumentStatus;
      optEAD: DocumentStatus;
      i983: DocumentStatus;
      i20: DocumentStatus;
    };
    visaStatus: string;
    __v: number;
  }
  
  interface DocumentStatus extends Document {
    status: string;
    createdDatetime: string;
    rejFeedback: string;
  }
