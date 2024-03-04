export interface Visa {
    _id?: string;
    userAccountId: string;
    docs: {
      [key: string]: VisaDocument;
      optReceipt: VisaDocument;
      optEAD: VisaDocument;
      i983: VisaDocument;
      i20: VisaDocument;
    };
    visaStatus: string;
    __v?: number;
    onboardingInfo: OnboardingInfo[];
    rejFeedback?: string;
  }

export interface VisaDocument {
  docId: string;
  docUrl: string;
  createdDatetime: string;
  status: string;
  rejFeedback?: string;
}

export interface OnboardingInfo {
  _id: string;
  userAccountId: string;
  email: string;
  onboardingStatus: string;
  rejFeedback: string;
  personalInfo: {
      firstName: string;
      lastName: string;
      middleName: string;
      preferredName: string;
      profilePictureUrl: string;
      currentAddress: {
          streetName: string;
          buildingApt: string;
          city: string;
          state: string;
          zip: string;
      };
      contactSchema: {
          cellPhoneNumber: string;
          workPhoneNumber: string;
      };
      carInformation: {
          make: string;
          model: string;
          color: string;
      };
      ssn: string;
      dateOfBirth: string;
      gender: string;
  };
  citizenshipStatus: {
      isCitizenOrPermanentResident: boolean;
      statusDetail: string;
      workAuthorization: string;
      workAuthorizationOtherTitle: string;
      workAuthorizationFiles: {
          docId: string;
          docUrl: string;
      }[];
      startEndDate: {
          startDate: string;
          endDate: string;
      };
  };
  driverLicense: {
      DocId: string;
      hasDriverLicense: boolean;
      driverLicenseNumber: string;
      expirationDate: string;
      driverLicenseCopyUrl: string;
  };
  referral: {
      firstName: string;
      lastName: string;
      middleName: string;
      phone: string;
      email: string;
      relationship: string;
  };
  emergencyContacts: {
      firstName: string;
      lastName: string;
      middleName: string;
      phone: string;
      email: string;
      relationship: string;
  }[];
  visaId: string;
  __v: number;
}