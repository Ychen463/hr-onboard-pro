/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Container, Button } from '@mui/material';
import { selectorCurrentOnboardingData } from '../store/slices/onboardingSlice.js';

import formDataToObject from '../utils/formDataToObject.jsx';
import PersonalInfoField from '../components/ApplicationFormComponents/PersonalInfoField.jsx';
import ContactInfoField from '../components/ApplicationFormComponents/ContactInfoField.jsx';
import AddressInfoField from '../components/ApplicationFormComponents/AddressInfoField.jsx';
import VisaInfoField from '../components/ApplicationFormComponents/VisaInfoField.jsx';
import ReferenceField from '../components/ApplicationFormComponents/ReferenceField.jsx';
import EmergencyContact from '../components/ApplicationFormComponents/EmergencyContact.jsx';
import DriverLicenseInfoField from '../components/ApplicationFormComponents/DriverLicenseInfoField.jsx';

function OnboardingApplicationPage() {
  const onboardingData = useSelector(selectorCurrentOnboardingData);

  // Disable form edit at "Pending" status
  const readOnlyForm = onboardingData ? onboardingData.onboardingStatus === 'Pending' : false;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = formDataToObject(formData);

    console.log('all form data entries', formDataObj);
  };

  return (
    <div style={{ width: '1080px', margin: '10px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Onboarding Application</h1>
      <Container component="form" onSubmit={handleSubmit}>
        <PersonalInfoField readOnly={readOnlyForm} />
        <ContactInfoField readOnly={readOnlyForm} />
        <AddressInfoField readOnly={readOnlyForm} />
        <VisaInfoField readOnly={readOnlyForm} />
        <DriverLicenseInfoField readOnly={readOnlyForm} />
        <ReferenceField readOnly={readOnlyForm} />
        <EmergencyContact readOnly={readOnlyForm} />
        {!readOnlyForm && (
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 5, mb: 2, float: 'right' }}
        >
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
