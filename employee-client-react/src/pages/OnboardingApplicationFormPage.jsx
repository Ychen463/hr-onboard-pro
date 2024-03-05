import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import {
  getOnboarding,
  selectOnboardingError,
  selectorCurrentOnboardingData,
  selectIsOnboardingLoading,
  submitOnboarding,
} from '../store/slices/onboardingSlice.js';
import { selectorCurrentUser } from '../store/slices/authSlice.js';

import formDataToObject from '../utils/formDataToObject.jsx';
import EmergencyContact from '../components/ApplicationFormComponents/EmergencyContact.jsx';
import createOnboardingFormPayload from '../utils/createOnboardingFormPayload.js';
import PersonalInformationFormSection from '../components/formSections/PersonalInformationSection.jsx';
import ContactInformationSection from '../components/formSections/ContactInformationSection.jsx';
import CurrentAddressSection from '../components/formSections/CurrentAddressSection.jsx';
import VisaSection from '../components/formSections/VisaSection.jsx';
import DriverLicenseSection from '../components/formSections/DriverLicenseSection.jsx';
import ReferralSection from '../components/formSections/ReferralSection.jsx';

function OnboardingApplicationPage() {
  const currentUserData = useSelector(selectorCurrentUser);
  const isLoading = useSelector(selectIsOnboardingLoading);
  const error = useSelector(selectOnboardingError);
  const onboardingData = useSelector(selectorCurrentOnboardingData);
  const { userId } = currentUserData;
  // These states only take care of init values of the whole form
  // not related to the final submit form values
  // const [personalInfo, setPersonalInfo] = useState({});
  // const [citizenshipStatus, setCitizenshipStatus] = useState({});
  // const [driverLicense, setDriverLicense] = useState({});
  // const [referral, setReferral] = useState({});
  // const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    middleName: 'A.',
    preferredName: 'Janie',
    profilePictureUrl: '',
    currentAddress: {
      streetName: '100 Main St',
      buildingApt: 'Apt 101',
      city: 'Anytown',
      state: 'Anystate',
      zip: '12345',
    },
    contactSchema: {
      cellPhoneNumber: '555-123-4567',
      workPhoneNumber: '555-765-4321',
    },
    carInformation: {
      make: 'Honda',
      model: 'Civic',
      color: 'Blue',
    },
    ssn: '123-45-6789',
    dateOfBirth: '1990-01-01T00:00:00.000Z',
    gender: 'Female',
  });
  const [citizenshipStatus, setCitizenshipStatus] = useState({});
  const [driverLicense, setDriverLicense] = useState({});
  const [referral, setReferral] = useState({});
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserData.onboardingStatus !== 'Not Started') dispatch(getOnboarding({ userId }));
  }, [currentUserData]);

  useEffect(() => {
    if (onboardingData !== null) {
      setPersonalInfo(onboardingData.personalInfo);
      setCitizenshipStatus(onboardingData.citizenshipStatus);
      setDriverLicense(onboardingData.driverLicense);
      setReferral(onboardingData.referral);
      setEmergencyContacts(onboardingData.emergencyContacts);
    }
  }, [onboardingData]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  // Disable form edit at "Pending" status
  // const readOnlyForm = false;
  const readOnlyForm = onboardingData ? onboardingData.onboardingStatus === 'Pending' : false;

  console.log('onboarding form', onboardingData);
  console.log('readOnlyForm', readOnlyForm);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newOnboardingFrom = {
      personalInfo,
      citizenshipStatus,
      driverLicense,
      referral,
      emergencyContacts,
    };
    console.log('newOnboardingFrom:', newOnboardingFrom);
    dispatch(submitOnboarding(newOnboardingFrom));
  };

  return (
    <div style={{ width: '1080px', margin: '10px auto' }}>
      <Typography
        variant="h4"
        style={{ textAlign: 'center', marginTop: '24px', marginBottom: '24px' }}
      >
        Onboarding Application
      </Typography>
      <Container component="form" onSubmit={handleSubmit}>
        <PersonalInformationFormSection
          readOnly={readOnlyForm}
          formData={personalInfo}
          setFormData={setPersonalInfo}
        />
        <br />
        <ContactInformationSection
          readOnly={readOnlyForm}
          formData={personalInfo}
          setFormData={setPersonalInfo}
        />
        <br />
        <CurrentAddressSection
          readOnly={readOnlyForm}
          formData={personalInfo}
          setFormData={setPersonalInfo}
        />
        <br />
        <VisaSection
          readOnly={readOnlyForm}
          formData={citizenshipStatus}
          setFormData={setCitizenshipStatus}
        />
        <br />
        <DriverLicenseSection
          readOnly={readOnlyForm}
          formData={driverLicense}
          setFormData={setDriverLicense}
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />
        <br />
        <ReferralSection readOnly={readOnlyForm} formData={referral} setFormData={setReferral} />
        <br />
        <EmergencyContact
          readOnly={readOnlyForm}
          emergencyContacts={emergencyContacts}
          setEmergencyContacts={setEmergencyContacts}
        />
        {!readOnlyForm && (
          <Button type="submit" variant="contained" sx={{ mt: 5, mb: 2, float: 'right' }}>
            Submit
          </Button>
        )}
        <br />
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
}

export default OnboardingApplicationPage;
