import { useDispatch, useSelector } from 'react-redux';
import InputUnit from '../ApplicationFormComponents/InputUnit.jsx';
import { Typography, Button, Box, TextField } from '@mui/material';
import { submitOptEAD, submiti983, selectorVisa } from '../../store/slices/visaSlice.js';
import { docUrlExample } from '../../constants/docUrlExample.js';
import FileListTable from '../FileListTable.jsx';

const VisaUpload = ({ message, fileName }) => {
  const dispatch = useDispatch();
  const visaData = useSelector(selectorVisa);
  const isI983 = visaData.currentStep === 'I983';
  // const isI983 = true;
  const handleDocSubmit = (e) => {
    e.preventDefault();

    const file = e.target[fileName].files[0];
    console.log('File to submit:', file);

    if (fileName === 'OPT EAD') {
      dispatch(submiti983(file));
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
      <Box component="form" onSubmit={handleDocSubmit}>
        {/* <InputUnit name={fileName} label={`Please upload ${fileName}`} type="file" required />
         */}
        <Box>{isI983 && <FileListTable files={docUrlExample} example={true} />}</Box>
        <br />
        <br />
        <br />
        <br />
        <TextField
          name={fileName}
          label={`Please upload ${fileName}`}
          required
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          type="file"
        />
        <Button type="submit" variant="contained" sx={{ margin: '10px 25vw' }}>
          Submit Document
        </Button>
      </Box>
    </div>
  );
};

export default VisaUpload;
