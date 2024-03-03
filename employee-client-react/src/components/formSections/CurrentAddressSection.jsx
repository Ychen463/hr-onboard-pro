import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const CurrentAddressSection = ({ readOnly, formData, setFormData }) => {
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      currentAddress: { ...formData.currentAddress, [e.target.name]: e.target.value },
    });
  };

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Current Address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            readOnly
            required
            label="Building, Apt Number"
            name="buildingApt"
            value={formData?.currentAddress?.buildingApt || ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            readOnly
            required
            label="Street Name"
            name="streetName"
            value={formData?.currentAddress?.streetName || ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            readOnly
            required
            label="City"
            name="city"
            value={formData?.currentAddress?.city || ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            readOnly
            required
            label="State"
            name="state"
            value={formData?.currentAddress?.state || ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            readOnly
            required
            label="Zip Code"
            name="zip"
            type="text"
            value={formData?.currentAddress?.zip || ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CurrentAddressSection;
