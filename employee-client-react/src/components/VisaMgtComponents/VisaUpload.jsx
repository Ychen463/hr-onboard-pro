import React from 'react';
import InputUnit from '../ApplicationFormComponents/InputUnit.jsx';
import { Typography } from '@mui/material';

const VisaUpload = ({ message, fileName, handleFileChange }) => {
  return (
    <div style={{ marginTop: '100px' }}>
      {message && (
        <Typography variant="h5" style={{ marginBottom: '150px', textAlign: 'center' }}>
          {message}
        </Typography>
      )}
      <Typography variant="h5" style={{ marginBottom: '150px', textAlign: 'center' }}>
        Please up load your {fileName}
      </Typography>
      <InputUnit
        name={fileName}
        label={`Copy of ${fileName} Document`}
        type="file"
        required
        onChange={handleFileChange}
      />
    </div>
  );
};

export default VisaUpload;
