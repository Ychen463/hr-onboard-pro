import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const ContactInformationSection = ({ readOnly, formData, setFormData }) => {
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      contactSchema: { ...formData.contactSchema, [e.target.name]: e.target.value },
    });
  };

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Contact Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Cell Phone Number"
            name="cellPhoneNumber"
            type="tel"
            value={formData?.contactSchema?.cellPhoneNumber || ''}
            onChange={handleInputChange}
            fullWidth
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Work Phone Number"
            name="workPhoneNumber"
            type="tel"
            value={formData?.contactSchema?.workPhoneNumber || ''}
            onChange={handleInputChange}
            fullWidth
            required
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactInformationSection;
