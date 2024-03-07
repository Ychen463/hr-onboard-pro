import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Button,
  Box,
} from '@mui/material';

const VisaSection = ({ readOnly, formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isCitizenOrPermanentResident') {
      setFormData((prev) => ({ ...prev, isCitizenOrPermanentResident: value === 'Yes' }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateInputChange = (e) => {
    const { name, value } = e.target;
    console.log('date', value);
    setFormData((prev) => ({ ...prev, startEndDate: { ...prev.startEndDate, [name]: value } }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, workAuthorizationFiles: [{ docUrl: file }] });
      //   window.open(URL.createObjectURL(file), '_blank');
    }
  };

  console.log('visa docurl', formData?.workAuthorizationFiles);

  return (
    <div>
      <Typography variant="h6" style={{ marginBottom: '12px' }}>
        Visa Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Are you a citizen or permanent resident?</InputLabel>
            <Select
              value={formData?.isCitizenOrPermanentResident ? 'Yes' : 'No'}
              onChange={handleInputChange}
              label="Are you a citizen or permanent resident?"
              name="isCitizenOrPermanentResident"
              required
              disabled={readOnly}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {formData.isCitizenOrPermanentResident && (
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Status Detail</InputLabel>
              <Select
                value={
                  formData?.statusDetail
                    ? formData.statusDetail === 'None'
                      ? ''
                      : formData.statusDetail
                    : 'Green Card'
                }
                onChange={handleInputChange}
                label="Status Detail"
                name="statusDetail"
                required
                disabled={readOnly}
              >
                <MenuItem value="Green Card">Green Card</MenuItem>
                <MenuItem value="Citizen">Citizen</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {!formData?.isCitizenOrPermanentResident && (
          <>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>What is your work authorization?</InputLabel>
                <Select
                  value={formData?.workAuthorization || 'H1-B'}
                  onChange={handleInputChange}
                  label="What is your work authorization?"
                  name="workAuthorization"
                  required
                  disabled={readOnly}
                >
                  <MenuItem value="H1-B">H1-B</MenuItem>
                  <MenuItem value="L2">L2</MenuItem>
                  <MenuItem value="F1(CPT/OPT)">F1(CPT/OPT)</MenuItem>
                  <MenuItem value="H4">H4</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {formData?.workAuthorization === 'Other' && (
              <Grid item xs={12}>
                <TextField
                  required
                  label="What is your work authorization title?"
                  name="workAuthorizationOtherTitle"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  value={formData?.workAuthorizationOtherTitle}
                  onChange={handleInputChange}
                  fullWidth
                  readOnly
                />
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                label="Authorization Start Date"
                name="startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={
                  formData?.startEndDate?.startDate
                    ? formData?.startEndDate?.startDate.length > 10
                      ? formData?.startEndDate?.startDate.substring(0, 10)
                      : formData?.startEndDate?.startDate
                    : ''
                }
                onChange={handleDateInputChange}
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Authorization End Date"
                name="endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={
                  formData?.startEndDate?.endDate
                    ? formData?.startEndDate?.endDate.length > 10
                      ? formData?.startEndDate?.endDate.substring(0, 10)
                      : formData?.startEndDate?.endDate
                    : ''
                }
                onChange={handleDateInputChange}
                fullWidth
                required
                disabled={readOnly}
              />
            </Grid>
          </>
        )}
        {!readOnly &&
          !formData?.isCitizenOrPermanentResident &&
          formData?.workAuthorization === 'F1(CPT/OPT)' && (
            <Grid item xs={12}>
              {/* <Button variant="contained" component="label"> */}
              {/* Upload CPT/OPT Receipt */}
              <InputLabel>Upload CPT/OPT Receipt</InputLabel>
              <TextField
                // label="Upload CPT/OPT Receipt"
                type="file"
                hidden
                onChange={handleFileChange}
                accept="application/pdf"
                file={
                  formData?.workAuthorizationFiles
                    ? formData?.workAuthorizationFiles[0].docUrl
                    : null
                }
              />
              {/* </Button> */}
            </Grid>
          )}
        {!formData?.isCitizenOrPermanentResident &&
          formData?.workAuthorization === 'F1(CPT/OPT)' &&
          formData?.workAuthorizationFiles?.length > 0 && (
            <Grid item xs={12}>
              <a
                href={formData?.workAuthorizationFiles[0].docUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography>View Uploaded Document</Typography>
              </a>
            </Grid>
          )}
      </Grid>
    </div>
  );
};

export default VisaSection;
