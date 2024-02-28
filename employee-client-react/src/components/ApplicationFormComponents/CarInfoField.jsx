/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography, Grid } from '@mui/material';

import { useState } from 'react';
import InputUnit from './InputUnit.jsx';

function CarInfoField({ readOnly }) {
  // select Data from Redux directly
  const [contactInfo, setContactInfo] = useState(
    {
      make: '',
      model: '',
      color: '',
    },
  );

  return (
    <Typography style={{ marginTop: '50px' }}>

      <Typography variant="h4" textAlign="left" style={{ marginLeft: '8px' }}>Contact Information</Typography>
      <Grid container spacing={8} sx={{ wnameth: '80%', margin: '0 auto' }}>

        <Grid item xs={6}>
          <InputUnit
            name="personalCellPhoneNumber"
            value={contactInfo.cellPhoneNumber}
            label="Cell Phone Number"
            type="tel"
            placeholder="(666)666-6666"
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6}>
          <InputUnit
            name="personalWorkPhoneNumber"
            value={contactInfo.workPhoneNumber}
            label="Work Phone Number"
            type="tel"
            placeholder="(666)666-6666"
            disabled={readOnly}
          />
        </Grid>

      </Grid>
    </Typography>
  );
}

export default CarInfoField;
