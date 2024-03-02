import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import VisaMgtPageSteper from '../components/VisaMgtComponents/VisaMgtPageSteper';
import FileListTable from '../components/FileListTable';
import { selectorCurrentUser } from '../store/slices/authSlice.js';
import { getVisaStatus } from '../store/slices/visaSlice.js';
import { VisaMgtPendingBoard } from '../components/VisaMgtComponents/VisaMgtPendingBoard.jsx';
import VisaUpload from '../components/VisaMgtComponents/VisaUpload.jsx';

const VisaStatusMgtPage = () => {
  const dispatch = useDispatch();
  const files = [
    { name: 'File1.pdf', url: 'http://example.com/file1.pdf' },
    { name: 'File2.jpg', url: 'http://example.com/file2.jpg' },
  ];
  const status = 'OPT Receipt';
  const message = 'Wating on approval';
  const currentUserData = useSelector(selectorCurrentUser);
  const { visaStatus } = currentUserData;
  console.log(visaStatus);

  const pending = visaStatus.includes('Pending');

  const nextStepMessage = { 'OPT RECEIPT-Approved': 'I - 983', 'I983-Approved': 'I - 20' };

  let step;
  if (visaStatus.includes('OPT Receipt')) {
    step = 'OPT EAD';
  } else if (visaStatus.includes('OPT EAD')) {
    step = 'I-983';
  } else if (visaStatus.includes('I983')) {
    step = 'I-20';
    // step = 'I-983';
  } else if (visaStatus.includes('I-20')) {
    step = 'I-20';
  }

  return (
    <>
      <VisaMgtPageSteper status={step} />
      <Box sx={{ width: '60%', margin: '0 auto' }}>
        {pending ? (
          <VisaMgtPendingBoard message={visaStatus} files={files} />
        ) : (
          <VisaUpload message={nextStepMessage[visaStatus]} />
        )}
      </Box>
    </>
  );
};

export default VisaStatusMgtPage;
