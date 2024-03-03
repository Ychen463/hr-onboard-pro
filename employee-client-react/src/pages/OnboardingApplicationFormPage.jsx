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
import PersonalInfoField from '../components/ApplicationFormComponents/PersonalInfoField.jsx';
import ContactInfoField from '../components/ApplicationFormComponents/ContactInfoField.jsx';
import AddressInfoField from '../components/ApplicationFormComponents/AddressInfoField.jsx';
import VisaInfoField from '../components/ApplicationFormComponents/VisaInfoField.jsx';
import ReferenceField from '../components/ApplicationFormComponents/ReferenceField.jsx';
import EmergencyContact from '../components/ApplicationFormComponents/EmergencyContact.jsx';
import DriverLicenseInfoField from '../components/ApplicationFormComponents/DriverLicenseInfoField.jsx';
import createOnboardingFormPayload from '../utils/createOnboardingFormPayload.js';

function OnboardingApplicationPage() {
  const currentUserData = useSelector(selectorCurrentUser);
  const isLoading = useSelector(selectIsOnboardingLoading);
  const error = useSelector(selectOnboardingError);
  const onboardingData = useSelector(selectorCurrentOnboardingData);
  const { userId } = currentUserData;
  // These states only take care of init values of the whole form
  // not related to the final submit form values
  const [personalInfo, setPersonalInfo] = useState({});
  const [citizenshipStatus, setCitizenshipStatus] = useState({});
  const [driverLicense, setDriverLicense] = useState({});
  const [referral, setReferral] = useState({});
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      currentUserData.onboardingStatus !== 'Not Started' &&
      currentUserData.onboardingStatus !== 'Completed'
    )
      dispatch(getOnboarding({ userId }));
  }, [currentUserData]);

  useEffect(() => {
    if (onboardingData?.personalInfo) {
      setPersonalInfo(onboardingData.personalInfo);
    }
    if (onboardingData?.citizenshipStatus) {
      setCitizenshipStatus(onboardingData.citizenshipStatus);
    }
    if (onboardingData?.driverLicense) {
      setDriverLicense(onboardingData.driverLicense);
    }
    if (onboardingData?.referral) {
      setReferral(onboardingData.referral);
    }
    if (onboardingData?.emergencyContacts) {
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

  if (currentUserData.onboardingStatus !== 'Not Started' && error) {
    return <Alert severity="error">{error}</Alert>;
  }
  // Disable form edit at "Pending" status
  const readOnlyForm = onboardingData ? onboardingData.onboardingStatus === 'Pending' : false;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = formDataToObject(formData);

    const onboardingSubmitData = createOnboardingFormPayload(formDataObj, emergencyContacts);
    console.log('onboardingSubmitData', onboardingSubmitData);
    dispatch(submitOnboarding(onboardingSubmitData));
  };

  console.log('OnboardingApplicationPag emergencyContacts', emergencyContacts);
  return (
    <div style={{ width: '1080px', margin: '10px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Onboarding Application</h1>
      <Container component="form" onSubmit={handleSubmit}>
        {currentUserData.onboardingStatus !== 'Not Started' &&
        error !== 'Onboarding record not found' ? (
          <Typography variant="h5" style={{ margin: '500px auto' }}>
            {error}
          </Typography>
        ) : (
          <>
            <PersonalInfoField
              readOnly={readOnlyForm}
              personalInfo={onboardingData?.personalInfo || personalInfo}
            />
            <ContactInfoField
              readOnly={readOnlyForm}
              personalInfo={onboardingData?.personalInfo || personalInfo}
            />
            <AddressInfoField
              readOnly={readOnlyForm}
              personalInfo={onboardingData?.personalInfo || personalInfo}
            />
            <VisaInfoField
              readOnly={readOnlyForm}
              citizenshipStatus={onboardingData?.citizenshipStatus || citizenshipStatus}
            />
            <DriverLicenseInfoField
              readOnly={readOnlyForm}
              driverLicense={onboardingData?.driverLicense || driverLicense}
              personalInfo={onboardingData?.personalInfo || personalInfo}
            />
            <ReferenceField
              readOnly={readOnlyForm}
              referral={onboardingData?.referral || referral}
            />
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
          </>
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
