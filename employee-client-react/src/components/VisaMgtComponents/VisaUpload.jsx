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

const VisaUpload = ({ message, fileName }) => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const visaData = useSelector(selectorVisa);
  const isI983 = visaData.currentStep === 'I983';

  const handleFileChange = (e) => {
    console.log(e.target);
    setFile(e.target.files[0]);
  };

  const handleDocSubmit = (e) => {
    e.preventDefault();
    if (visaData.currentStep === 'OPT EAD') {
      dispatch(submitOptEAD(file));
    }
    if (visaData === 'I983') {
      dispatch(submiti983, file);
    }
    if (visaData === 'I20') {
      dispatch(submiti20, file);
    }
  };

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
      <Box>
        <Box>{isI983 && <FileListTable files={docUrlExample} example={true} />}</Box>
        <br />
        <br />
        <br />
        <br />

        <input name="visa file" type="file" onChange={handleFileChange} accept="application/pdf" />
        <Button onClick={handleDocSubmit} variant="contained" component="label">
          Submit Document
        </Button>
      </Box>
    </div>
  );
};

export default VisaUpload;
