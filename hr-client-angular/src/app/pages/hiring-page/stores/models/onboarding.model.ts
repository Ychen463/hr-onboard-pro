export interface DisplayedOnboarding {
    onboardingStatus: string;
    name: string;
    email: string;
    userAccountId: string;
}

export interface Onboarding {
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
  
  export interface PersonalInfo {
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
  
  export interface Address {
    streetName: string;
    buildingApt: string;
    city: string;
    state: string;
    zip: string;
  }
  
  export interface ContactSchema {
    cellPhoneNumber: string;
    workPhoneNumber: string;
  }
  
  export interface CarInformation {
    make: string;
    model: string;
    color: string;
  }
  
  export interface CitizenshipStatus {
    isCitizenOrPermanentResident: boolean;
    statusDetail: string;
    workAuthorization: string;
    workAuthorizationOtherTitle: string;
    workAuthorizationFiles: Document[];
    startEndDate: StartEndDate;
  }
  
  export interface StartEndDate {
    startDate: string;
    endDate: string;
  }
  
  export interface Document {
    docId: string;
    docUrl: string;
  }
  
  export interface DriverLicense {
    DocId: string;
    hasDriverLicense: boolean;
    driverLicenseNumber: string;
    expirationDate: string;
    driverLicenseCopyUrl: string;
  }
  
  export interface Referral {
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  }
  export interface EmergencyContact {
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  }
  
  export interface EmergencyContacts {
    emergencyContacts: EmergencyContact[];
  }
  
  
  
  
  export interface VisaInfo {
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
  
  export interface DocumentStatus extends Document {
    status: string;
    createdDatetime: string;
    rejFeedback: string;
  }
