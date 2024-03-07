import { useDispatch, useSelector } from 'react-redux';
import InputUnit from '../ApplicationFormComponents/InputUnit.jsx';
import { Typography, Button, Box, TextField } from '@mui/material';
import {
  submitOptEAD,
  submiti983,
  submiti20,
  selectorVisa,
  getVisaStatus,
} from '../../store/slices/visaSlice.js';
import { docUrlExample } from '../../constants/docUrlExample.js';
import FileListTable from '../FileListTable.jsx';
import { selectorCurrentUser } from '../../store/slices/authSlice.js';
import { useState } from 'react';

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
