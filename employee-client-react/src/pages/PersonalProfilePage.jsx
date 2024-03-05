import { Container, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import formDataToObject from '../utils/formDataToObject.jsx';
import PersonalInfoField from '../components/ApplicationFormComponents/PersonalInfoField.jsx';
import ContactInfoField from '../components/ApplicationFormComponents/ContactInfoField.jsx';
import AddressInfoField from '../components/ApplicationFormComponents/AddressInfoField.jsx';
import VisaInfoField from '../components/ApplicationFormComponents/VisaInfoField.jsx';
// import UserEmailField from '../components/UserEmailField.jsx';
import UserEmailField from '../components/formSections/UserEmailField.jsx';

import EmergencyContact from '../components/ApplicationFormComponents/EmergencyContact.jsx';
import {
  getUserProfile,
  selectorUserProfile,
  selectIsUserProfileLoading,
  selectUserProfileError,
  updateUserProfile,
} from '../store/slices/userProfileSlice.js';
import PersonalInformationFormSection from '../components/formSections/PersonalInformationSection.jsx';
import ContactInformationSection from '../components/formSections/ContactInformationSection.jsx';
import CurrentAddressSection from '../components/formSections/CurrentAddressSection.jsx';
import VisaSection from '../components/formSections/VisaSection.jsx';
import DriverLicenseSection from '../components/formSections/DriverLicenseSection.jsx';
import ReferralSection from '../components/formSections/ReferralSection.jsx';
import { selectorCurrentUser } from '../store/slices/authSlice.js';
function PersonalProfilePage() {
  const [readOnly, setReadOnly] = useState(true);
  const dispatch = useDispatch();

  const userProfile = useSelector(selectorUserProfile);
  const currentUser = useSelector(selectorCurrentUser);
  const isLoading = useSelector(selectIsUserProfileLoading);
  const error = useSelector(selectUserProfileError);
  // These states only take care of init values of the whole form
  // not related to the final submit form values
  const [personalInfo, setPersonalInfo] = useState({});
  const [citizenshipStatus, setCitizenshipStatus] = useState({});
  const [driverLicense, setDriverLicense] = useState({});
  const [referral, setReferral] = useState({});
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  useEffect(() => {
    if (userProfile?.personalInfo) {
      setPersonalInfo(userProfile.personalInfo);
      setCitizenshipStatus(userProfile.citizenshipStatus);
      setDriverLicense(userProfile.driverLicense);
      setReferral(userProfile.referral);
      setEmergencyContacts(userProfile.emergencyContacts);
    }
  }, [userProfile]);

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
  console.log('userProfile', userProfile);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserProfile = {
      _id: userProfile._id,
      email: userProfile.email,
      personalInfo,
      citizenshipStatus,
      driverLicense,
      referral,
      emergencyContacts,
    };
    console.log('Form by manual:', newUserProfile);
    dispatch(updateUserProfile(newUserProfile));
    setReadOnly(true);
  };

  return (
    <div style={{ width: '1080px', margin: '10px auto' }}>
      <Typography
        variant="h4"
        style={{ textAlign: 'center', marginTop: '24px', marginBottom: '24px' }}
      >
        Personal Profile
      </Typography>
      {error}
      <Container component="form" onSubmit={handleSubmit}>
        <PersonalInformationFormSection
          readOnly={readOnly}
          formData={personalInfo}
          setFormData={setPersonalInfo}
        />
        <br />
        <UserEmailField />
        <br />
        <ContactInformationSection
          readOnly={readOnly}
          formData={personalInfo}
          setFormData={setPersonalInfo}
        />
        <br />
        <CurrentAddressSection
          readOnly={readOnly}
          formData={personalInfo}
          setFormData={setPersonalInfo}
        />
        <br />
        <VisaSection
          readOnly={true}
          formData={citizenshipStatus}
          setFormData={setCitizenshipStatus}
        />
        <br />
        <DriverLicenseSection
          readOnly={readOnly}
          formData={driverLicense}
          setFormData={setDriverLicense}
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />
        <br />
        {/* <ReferralSection readOnly={readOnly} formData={referral} setFormData={setReferral} />
        <br /> */}
        <EmergencyContact
          readOnly={readOnly}
          emergencyContacts={emergencyContacts}
          setEmergencyContacts={setEmergencyContacts}
        />

        {readOnly ? (
          <Button
            variant="contained"
            sx={{ mt: 5, mb: 2, float: 'right' }}
            onClick={() => setReadOnly(false)}
          >
            Edit
          </Button>
        ) : (
          <>
            <br />
            <Button type="submit" variant="contained" sx={{ m: 2, float: 'right' }}>
              Submit
            </Button>
            <Button
              variant="outlined"
              sx={{ m: 2, float: 'right' }}
              onClick={() => setReadOnly(true)}
            >
              Cancle
            </Button>
          </>
        )}
      </Container>
    </div>
  );
}

export default PersonalProfilePage;
