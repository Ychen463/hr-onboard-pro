import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';

const ReferralSection = ({ readOnly, formData, setFormData }) => {
  const [hasReferral, setHasReferral] = useState('No');

  useEffect(() => {
    if (formData?.firstName) {
      setHasReferral('Yes');
    }
  }, [formData]);

  const handleReferralChange = (e) => {
    setHasReferral(e.target.value);
    if (e.target.value === 'No') {
      // Clear relevant data if the user selects 'No'
      setFormData({});
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Referral Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Do you have a referral?</InputLabel>
            <Select
              name="hasReferral"
              value={hasReferral}
              onChange={handleReferralChange}
              label="Do you have a referral?"
              required
              disabled={readOnly}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {hasReferral === 'Yes' && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData?.firstName || ''}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData?.lastName || ''}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Middle Name"
                name="middleName"
                value={formData?.middleName || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Preferred Name"
                name="preferredName"
                value={formData?.preferredName || ''}
                onChange={handleInputChange}
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData?.phone || ''}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                value={formData?.email || ''}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Relationship"
                name="relationship"
                value={formData?.relationship || ''}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default ReferralSection;
