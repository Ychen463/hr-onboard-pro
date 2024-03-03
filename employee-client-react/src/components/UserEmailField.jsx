/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography, Grid } from '@mui/material';

import { useState } from 'react';
import InputUnit from './ApplicationFormComponents/InputUnit.jsx';
import { useSelector } from 'react-redux';
import { selectorCurrentUser } from '../store/slices/authSlice.js';

function UserEmailField({ readOnly }) {
  // select Data from Redux directly
  const currentUser = useSelector(selectorCurrentUser);

  return (
    <Typography style={{ marginTop: '50px' }}>
      <Typography variant="h4" textAlign="left" style={{ marginLeft: '8px' }}>
        Contact Information
      </Typography>
      <Grid container spacing={8} sx={{ wnameth: '80%', margin: '0 auto' }}>
        <Grid item xs={6}>
          <InputUnit
            name="userEmail"
            value={currentUser.email}
            label="User Email"
            type="text"
            disabled={true}
          />
        </Grid>
      </Grid>
    </Typography>
  );
}

export default UserEmailField;
