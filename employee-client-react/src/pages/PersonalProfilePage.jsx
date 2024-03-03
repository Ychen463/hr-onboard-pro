import { Container, Button } from '@mui/material';
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
import UserEmailField from '../components/UserEmailField.jsx';

import EmergencyContact from '../components/ApplicationFormComponents/EmergencyContact.jsx';
import {
  getUserProfile,
  selectorUserProfile,
  selectIsUserProfileLoading,
  selectUserProfileError,
} from '../store/slices/userProfileSlice.js';

function PersonalProfilePage() {
  const [readOnly, setReadOnly] = useState(true);
  const dispatch = useDispatch();

  const userProfile = useSelector(selectorUserProfile);
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
    }
    if (userProfile?.citizenshipStatus) {
      setCitizenshipStatus(userProfile.citizenshipStatus);
    }
    if (userProfile?.driverLicense) {
      setDriverLicense(userProfile.driverLicense);
    }
    if (userProfile?.referral) {
      setReferral(userProfile.referral);
    }
    if (userProfile?.emergencyContacts) {
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
    const formData = new FormData(event.currentTarget);
    const formDataObj = formDataToObject(formData);

    console.log('all form data entries', formDataObj);
  };

  return (
    <div style={{ width: '1080px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Personal Profile Page</h1>
      <Container
        component="form"
        onSubmit={handleSubmit}
        style={{ width: '960px', marginLeft: '-30px' }}
      >
        <PersonalInfoField readOnly={readOnly} personalInfo={personalInfo} />
        <UserEmailField />
        <AddressInfoField readOnly={readOnly} personalInfo={personalInfo} />
        <ContactInfoField readOnly={readOnly} personalInfo={personalInfo} />
        <VisaInfoField readOnly />
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
