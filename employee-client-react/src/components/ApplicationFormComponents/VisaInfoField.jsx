/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import UploadDropzone from './UploadDropzone.jsx';
import { Typography, Grid } from '@mui/material';

import { useState } from 'react';

import InputUnit from './InputUnit.jsx';

function VisaInfoField({ readOnly }) {
  const [citizenshipStatus, setCitizenshipStatus] = useState({
    isCitizenOrPermanentResident: 'No',
    statusDetail: '', // "Green Card", "Citizen", or "None"
    workAuthorization: '', // "H1-B", "L2", "F1(CPT/OPT)", "H4", "Other"
    workAuthorizationOtherTitle: '', // If "Other" is selected
    workAuthorizationFiles: [
      // {
      //   "documentId": "ObjectId",
      //   "docUrl": "String"
      // }
    ], // URLs to uploaded files
    startEndDate: {
      startDate: '',
      endDate: '',
    },
  });
  // const handleFileUpload = (url) => {
  //   console.log('Uploaded URL:', url);
  //   // Do whatever you want with the uploaded URL here
  // };
  const [formControl, setFormControl] = useState({
    isCitizenOrPermanentResident: citizenshipStatus.isCitizenOrPermanentResident,
    workAuthorization: citizenshipStatus.workAuthorization,
  });
  const handleSubmit = (event) => {
    const { name, value } = event.target;
    setFormControl((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSubmit = (e) => {
    const { files } = e.target;

    // console.log('uploaded files utl:', files);
  };

  const citizenshipOptions = ['Yes', 'No'];
  const citizenshipDetailOptions = ['Green Card', 'Citizen'];
  const workAuthorizationOptions = ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other'];
  return (
    <Typography style={{ marginTop: '50px' }}>

      <Typography variant="h4" textAlign="left" style={{ marginLeft: '8px' }}>Visa status Information</Typography>
      <Grid container spacing={8} sx={{ wnameth: '80%', margin: '0 auto' }}>

        <Grid item xs={6}>
          <InputUnit
            onChange={handleSubmit}
            name="isCitizenOrPermanentResident"
            value={citizenshipStatus.isCitizenOrPermanentResident}
            label="Are you Citizen or permanent resident?"
            type="dropdown"
            placeholder="Select citizenship"
            options={citizenshipOptions}
            required
            disabled={readOnly}
          />
        </Grid>
        <Grid item xs={6} />
        { formControl.isCitizenOrPermanentResident === 'Yes' && (
          <Grid item xs={6}>
            <InputUnit
              name="statusDetail"
              value={citizenshipStatus.statusDetail}
              label="Citizenship Detail"
              type="dropdown"
              placeholder="Select citizenship"
              options={citizenshipDetailOptions}
              required
              disabled={readOnly}
            />
          </Grid>
        )}
        { formControl.isCitizenOrPermanentResident === 'No' && (
        <>

          <Grid item xs={6}>
            <InputUnit
              onChange={handleSubmit}
              name="workAuthorization"
              value={citizenshipStatus.workAuthorization}
              label="What is your work authorization?"
              type="dropdown"
              placeholder="Select work authorization"
              options={workAuthorizationOptions}
              required
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6} />
          {formControl.workAuthorization === 'Other' && (
          <Grid item xs={12}>
            <InputUnit
              onChange={handleSubmit}
              name="workAuthorizationOtherTitle"
              value={citizenshipStatus.workAuthorizationOtherTitle}
              label="What is your work authorization title?"
              placeholder="Enter authorization title"
              required
              disabled={readOnly}
            />
          </Grid>
          )}

          <Grid item xs={6}>
            <InputUnit
              name="startDate"
              value={citizenshipStatus.startEndDate.startDate}
              label="Authorization start date"
              type="date"
              required
              disabled={readOnly}
            />
          </Grid>
          <Grid item xs={6}>
            <InputUnit
              name="endDate"
              value={citizenshipStatus.startEndDate.endDate}
              label="Authorization end date"
              type="date"
              required
              disabled={readOnly}
            />
          </Grid>
          {formControl.workAuthorization === 'F1(CPT/OPT)' && (
          <Grid item xs={6}>
            <InputUnit
              name="workAuthorizationFiles"
              value={citizenshipStatus.startEndDate.endDate}
              label="Upload CPT/OPT Receipt"
              type="file"
              required
              disabled={readOnly}
              onChange={handleFileSubmit}
            />
          </Grid>
          )}
        </>

        )}
      </Grid>
    </Typography>
  );
}

export default VisaInfoField;
