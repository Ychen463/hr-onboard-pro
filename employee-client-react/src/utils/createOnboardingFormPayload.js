const createOnboardingFormPayload = (rawData) => {
  const payload = {
    personalInfo: {
      firstName: rawData.personalFirstName,
      lastName: rawData.personalLastName,
      middleName: rawData.personalMiddleName,
      preferredName: rawData.personalPreferredName,
      profilePictureUrl: rawData.personalProfilePictureUrl,
      currentAddress: {
        streetName: rawData.streetName,
        buildingApt: rawData.buildingApt,
        city: rawData.city,
        state: rawData.state,
        zip: rawData.zip,
      },
      contactSchema: {
        cellPhoneNumber: rawData.personalCellPhoneNumber,
        workPhoneNumber: rawData.personalWorkPhoneNumber,
      },
      carInformation: {
        make: rawData.carMake,
        model: rawData.carModel,
        color: rawData.carColor,
      },
      ssn: rawData.ssn,
      dateOfBirth: rawData.dateOfBirth,
      gender: rawData.gender,
    },
    citizenshipStatus: {
      isCitizenOrPermanentResident: rawData.isCitizenOrPermanentResident,
      statusDetail: rawData.statusDetail,
      workAuthorization: rawData.workAuthorization,
      workAuthorizationOtherTitle: rawData.workAuthorizationOtherTitle,
      workAuthorizationFiles: [
        {
          docUrl: rawData.workAuthorizationFiles,
        },
      ],
      startEndDate: {
        startDate: rawData.startDate,
        endDate: rawData.endDate,
      },
    },
    driverLicense: {
      hasDriverLicense: rawData.hasDriverLicense,
      driverLicenseNumber: rawData.driverLicenseNumber,
      expirationDate: rawData.driverLicenseExpirationDate,
      driverLicenseCopyUrl: rawData.driverLicenseCopy,
    },
    referral: {
      firstName: rawData.referralFirstName,
      lastName: rawData.referralLastName,
      middleName: rawData.referralMiddleName,
      phone: rawData.referralPhoneNumber,
      email: rawData.referralEmail,
      relationship: rawData.referralRelationship,
    },
    emergencyContacts: [
      {
        firstName: rawData.emergencyContactFirstName,
        lastName: rawData.emergencyContactLastName,
        middleName: rawData.emergencyContactMiddleName,
        phone: rawData.emergencyContactPhoneNumber,
        email: rawData.emergencyContactEmail,
        relationship: rawData.emergencyContactRelationship,
      },
    ],
  };
  return payload;
};

export default createOnboardingFormPayload;
