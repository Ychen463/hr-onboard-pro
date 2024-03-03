import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const DriverLicenseSection = ({
  readOnly,
  formData,
  setFormData,
  personalInfo,
  setPersonalInfo,
}) => {
  const [formControl, setFormControl] = useState({
    hasDriverLicense: 'No',
    hasCar: 'No',
  });
  const [driverLicensePreview, setDriverLicensePreview] = useState('');

  useEffect(() => {
    if (formData?.hasDriverLicense) {
      setFormControl((prev) => ({ ...prev, hasDriverLicense: 'Yes' }));
    }
  }, [formData]);

  useEffect(() => {
    if (personalInfo?.carInformation?.make) {
      setFormControl((prev) => ({ ...prev, hasCar: 'Yes' }));
    }
  }, [personalInfo]);

  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setFormControl((prev) => ({ ...prev, [name]: value }));
    if (name === 'hasDriverLicense') {
      setFormData((prev) => ({ ...prev, hasDriverLicense: value === 'Yes' }));
    }
    if (name === 'hasCar') {
      setPersonalInfo((prev) => ({ ...prev, carInformation: value === 'No' && {} }));
    }
  };

  const handleLicenseChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCarChange = (event) => {
    const { name, value } = event.target;
    setPersonalInfo((prev) => ({
      ...prev,
      carInformation: { ...prev.carInformation, [name]: value },
    }));
  };

  console.log('Driver License URL:', formData.driverLicenseCopyUrl);

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Driver's License Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Do you have a driver's license?</InputLabel>
            <Select
              name="hasDriverLicense"
              value={formControl.hasDriverLicense}
              onChange={handleSubmit}
              label="Do you have a driver's license?"
              disabled={readOnly}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {formControl.hasDriverLicense === 'Yes' && (
          <>
            <Grid item xs={12} md={6}>
              <TextField
                label="Driver License Number"
                name="driverLicenseNumber"
                value={formData?.driverLicenseNumber || ''}
                onChange={handleLicenseChange}
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Driver License Expiration Date"
                name="expirationDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData?.expirationDate ? formData.expirationDate.substring(0, 10) : ''}
                onChange={handleLicenseChange}
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12}>
              {!readOnly && (
                <Button variant="contained" component="label">
                  Upload Driver License
                  <input
                    name="driverLicenseCopyUrl"
                    type="file"
                    hidden
                    onChange={handleLicenseChange}
                    accept="application/pdf"
                  />
                </Button>
              )}
              {formData?.driverLicenseCopyUrl && (
                <a href={formData.driverLicenseCopyUrl} target="_blank" rel="noopener noreferrer">
                  View Uploaded License
                </a>
              )}
            </Grid>
          </>
        )}

        {formControl.hasDriverLicense === 'Yes' && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Do you have a car?</InputLabel>
              <Select
                name="hasCar"
                value={formControl.hasCar}
                onChange={handleSubmit}
                label="Do you have a car?"
                disabled={readOnly}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {formControl.hasDriverLicense === 'Yes' && formControl.hasCar === 'Yes' && (
          <>
            <Grid item xs={12} md={4}>
              <TextField
                label="Make"
                name="make"
                value={personalInfo?.carInformation?.make || ''}
                onChange={handleCarChange}
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Model"
                name="model"
                value={personalInfo?.carInformation?.model || ''}
                onChange={handleCarChange}
                fullWidth
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Color"
                name="color"
                value={personalInfo?.carInformation?.color || ''}
                onChange={handleCarChange}
                fullWidth
                disabled={readOnly}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default DriverLicenseSection;
