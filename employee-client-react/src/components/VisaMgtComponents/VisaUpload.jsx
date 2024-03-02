import React from 'react';
import InputUnit from '../ApplicationFormComponents/InputUnit.jsx';
import { Typography } from '@mui/material';

const VisaUpload = ({ message }) => {
  return (
    <div style={{ marginTop: '100px' }}>
      <Typography variant="h5" style={{ marginBottom: '150px', textAlign: 'center' }}>
        Please up load your {message}
      </Typography>
      <InputUnit
        name="visa"
        label="Copye of Document"
        type="file"
        required

        // onChange={handleFileSubmit}
      />
    </div>
  );
};

export default VisaUpload;
