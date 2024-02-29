/* eslint-disable react/prop-types */
import { Typography, Grid } from '@mui/material';
import { useState } from 'react';
import InputUnit from './InputUnit.jsx';

function ReferenceField({ readOnly }) {
  // eslint-disable-next-line no-unused-vars
  const [referral, setReferral] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    email: '',
    relationship: '',
  });
  const [formControl, setFormControl] = useState({ isCitizenOrPermanentResident: false });
  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setFormControl((prev) => ({ ...prev, [name]: value }));
  };
  const hasreferalOptions = ['Yes', 'No'];
  return (
    <Typography style={{ marginTop: '50px' }}>

      <Typography variant="h4" component="h2" gutterBottom textAlign="left" style={{ marginLeft: '8px' }}> Reference Information</Typography>
      <Grid container spacing={10} sx={{ wnameth: '80%', margin: '0 auto' }}>

        <Grid item xs={6}>
          <InputUnit
            onChange={handleSubmit}
            name="ifHasReferal"
            value=""
            label="Do you have a referal?"
            type="dropdown"
            placeholder="Select citizenship"
            options={hasreferalOptions}
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6} />
        {formControl.ifHasReferal === 'Yes' && (
        <>
          <Grid item xs={6}>
            <InputUnit
              name="referralFirstName"
              value={referral.firstName}
              label="First Name"
              type="text"
              placeholder="John"
              required
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="referralLastName"
              value={referral.lastName}
              label="Last Name"
              type="text"
              placeholder="Doe"
              required
              disabled={readOnly}
            />
          </Grid>

          <Grid item xs={6}>
            <InputUnit
              name="referralMiddleName"
              value={referral.middleName}
              label="Middle Name"
              type="text"
              placeholder="Tommy"
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="referralPreferredName"
              value={referral.preferredName}
              label="Preferred Name"
              type="text"
              placeholder="Johnny"
              disabled={readOnly}
            />
          </Grid>

          <Grid item xs={6}>
            <InputUnit
              name="referralPhoneNumber"
              required
              value={referral.phone}
              label="Referral's Phone Number"
              type="text"
              placeholder="(666) 666-6666"
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="referralEmail"
              required
              value={referral.email}
              label="Referral's Email"
              type="email"
              placeholder="sampleemail@gmail.com"
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="referralRelationship"
              required
              value={referral.email}
              label="Referral's Relationship"
              type="text"
              placeholder="Enter relationship"
              disabled={readOnly}
            />
          </Grid>
        </>
        )}
      </Grid>
    </Typography>
  );
}

export default ReferenceField;
