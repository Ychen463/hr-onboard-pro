const createOnboardingFormPayload = (rawData, emergencyContacts) => {
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
      carInformation: rawData.hasCar && {
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
      statusDetail: rawData.isCitizenOrPermanentResident ? rawData.statusDetail : "None",
      workAuthorization: rawData.isCitizenOrPermanentResident ? 'None' : rawData.workAuthorization,
      workAuthorizationOtherTitle: rawData.isCitizenOrPermanentResident ? 'None' : rawData.workAuthorizationOtherTitle,
      workAuthorizationFiles: [
        {
          docUrl: rawData.isCitizenOrPermanentResident ? '' : rawData.workAuthorizationFiles,
        },
      ],
      startEndDate: {
        startDate: rawData.isCitizenOrPermanentResident ? '' : rawData.startDate,
        endDate: rawData.isCitizenOrPermanentResident ? '' : rawData.endDate,
      },
    },
    driverLicense: {
      hasDriverLicense: rawData.hasDriverLicense,
      driverLicenseNumber: rawData.hasDriverLicense ? rawData.driverLicenseNumber : '',
      expirationDate: rawData.hasDriverLicense ? rawData.driverLicenseExpirationDate : '',
      driverLicenseCopyUrl: rawData.hasDriverLicense ? rawData.driverLicenseCopy : '',
    },
    referral: rawData.ifHasReferal && {
      firstName: rawData.referralFirstName,
      lastName: rawData.referralLastName,
      middleName: rawData.referralMiddleName,
      phone: rawData.referralPhoneNumber,
      email: rawData.referralEmail,
      relationship: rawData.referralRelationship,
    },
    emergencyContacts: emergencyContacts,
  };
  return payload;
};

export default createOnboardingFormPayload;
