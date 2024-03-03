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
      isCitizenOrPermanentResident: rawData.isCitizenOrPermanentResident === 'Yes',
      statusDetail: rawData.isCitizenOrPermanentResident === 'Yes' ? rawData.statusDetail : "None",
      workAuthorization: rawData.isCitizenOrPermanentResident === 'Yes' ? 'None' : rawData.workAuthorization,
      workAuthorizationOtherTitle: rawData.isCitizenOrPermanentResident === 'Yes' ? 'None' : rawData.workAuthorizationOtherTitle,
      workAuthorizationFiles: [
        {
          docUrl: rawData.isCitizenOrPermanentResident === 'No' ? '' : rawData.workAuthorizationFiles,
        },
      ],
      startEndDate: {
        startDate: rawData.isCitizenOrPermanentResident === 'Yes' ? '' : rawData.startDate,
        endDate: rawData.isCitizenOrPermanentResident === 'Yes' ? '' : rawData.endDate,
      },
    },
    driverLicense: {
      hasDriverLicense: rawData.hasDriverLicense === 'Yes',
      driverLicenseNumber: rawData.hasDriverLicense === 'Yes' ? rawData.driverLicenseNumber : '',
      expirationDate: rawData.hasDriverLicense === 'Yes' ? rawData.driverLicenseExpirationDate : '',
      driverLicenseCopyUrl: rawData.hasDriverLicense === 'Yes' ? rawData.driverLicenseCopy : '',
    },
    referral: rawData.ifHasReferal === 'Yes' ? {
      firstName: rawData.referralFirstName,
      lastName: rawData.referralLastName,
      middleName: rawData.referralMiddleName,
      phone: rawData.referralPhoneNumber,
      email: rawData.referralEmail,
      relationship: rawData.referralRelationship,
    } : {},
    emergencyContacts: emergencyContacts,
  };
  return payload;
};

export default createOnboardingFormPayload;
