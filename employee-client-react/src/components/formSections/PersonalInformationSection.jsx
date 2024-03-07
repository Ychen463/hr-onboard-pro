import React, { useState } from 'react';
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

const PersonalInformationFormSection = ({ readOnly, formData, setFormData }) => {
  const [profileImagePreview, setProfileImagePreview] = useState(formData?.profilePictureUrl || '');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePictureUrl: file });
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const cancelImage = () => {
    setFormData({ ...formData, profilePictureUrl: null });
    setProfileImagePreview('');
  };

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="First Name"
            name="firstName"
            value={formData?.firstName || ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Last Name"
            name="lastName"
            value={formData?.lastName || ''}
            onChange={handleInputChange}
            fullWidth
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
            required
            label="SSN"
            name="ssn"
            value={formData?.ssn || ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData?.dateOfBirth ? formData?.dateOfBirth.substring(0, 10) : ''}
            onChange={handleInputChange}
            fullWidth
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData?.gender || 'Male'}
              label="Gender"
              onChange={handleInputChange}
              disabled={readOnly}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="I do not wish to answer">I do not wish to answer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {!readOnly && (
            <Button variant="contained" component="label">
              Upload Profile Image
              <input type="file" hidden onChange={handleImageChange} accept="image/jpeg" readOnly />
            </Button>
          )}
          {profileImagePreview && (
            <div>
              <img
                src={profileImagePreview}
                alt="Profile"
                style={{ height: '100px', marginLeft: '10px' }}
              />
              {!readOnly && (
                <IconButton onClick={cancelImage}>
                  <CancelIcon />
                </IconButton>
              )}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalInformationFormSection;
