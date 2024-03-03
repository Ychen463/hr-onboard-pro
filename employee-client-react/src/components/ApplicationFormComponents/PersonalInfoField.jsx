import { Typography, Grid } from '@mui/material';
import InputUnit from './InputUnit.jsx';
import { useState, useEffect } from 'react';

const genderOptions = ['Male', 'Female', 'I do not wish to answer'];

function PersonalInfoField({ readOnly, personalInfo }) {
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    if (personalInfo?.gender) {
      setGender(personalInfo.gender);
    }
  }, [personalInfo]);

  const handleGender = (event) => {
    const { value } = event.target;
    setGender(value);
  };

  console.log('PersonalInfoField personalInfo', personalInfo);

  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom textAlign="left">
        Personal Information
      </Typography>
      <div style={{ marginTop: '50px' }}>
        <Grid container spacing={10} sx={{ wnameth: '80%', margin: '0 auto' }}>
          <Grid item xs={6}>
            <InputUnit
              name="personalFirstName"
              value={personalInfo?.firstName}
              label="First Name"
              type="text"
              required
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="personalLastName"
              value={personalInfo?.lastName}
              label="Last Name"
              type="text"
              required
              disabled={readOnly}
            />
          </Grid>

          <Grid item xs={6}>
            <InputUnit
              name="personalMiddleName"
              value={personalInfo?.middleName}
              label="Middle Name"
              type="text"
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="personalPreferredName"
              value={personalInfo?.preferredName}
              label="Preferred Name"
              type="text"
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="ssn"
              required
              value={personalInfo?.ssn}
              label="SSN Number"
              type="text"
              placeholder="xxx-xx-xxxx"
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="dateOfBirth"
              value={personalInfo?.dateOfBirth ? personalInfo.dateOfBirth.substring(0, 10) : ''}
              label="Date Of Birth"
              type="date"
              required
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="gender"
              value={gender}
              onChange={handleGender}
              label="Gender"
              type="dropdown"
              options={genderOptions}
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <InputUnit
              name="personalProfilePictureUrl"
              // value={personalInfo?.profilePictureUrl || ""}
              label="Upload Profile Picture"
              type="file"
              disabled={readOnly}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default PersonalInfoField;
