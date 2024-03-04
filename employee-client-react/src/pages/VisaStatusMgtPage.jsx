import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import VisaMgtPageSteper from '../components/VisaMgtComponents/VisaMgtPageSteper';
import FileListTable from '../components/FileListTable';
import { selectorCurrentUser } from '../store/slices/authSlice.js';
import { getVisaStatus, selectorVisa } from '../store/slices/visaSlice.js';
import { selectVisaError } from '../store/slices/visaSlice.js';
import { VisaMgtPendingBoard } from '../components/VisaMgtComponents/VisaMgtPendingBoard.jsx';
import VisaUpload from '../components/VisaMgtComponents/VisaUpload.jsx';

const VisaStatusMgtPage = () => {
  const dispatch = useDispatch();
  const files = [
    { name: 'File1.pdf', url: 'http://example.com/file1.pdf' },
    { name: 'File2.jpg', url: 'http://example.com/file2.jpg' },
  ];

  const visaStatus = useSelector(selectorVisa);
  const currentStep = visaStatus?.currentStep;
  const rejFeedback = visaStatus?.rejFeedback || '';
  const currentStatus = visaStatus?.currentStatus || '';

  const selectVisaErrorMessage = useSelector(selectVisaError);
  const currentUserData = useSelector(selectorCurrentUser);
  const userAccountId = currentUserData.userId;

  useEffect(() => {
    console.log('fetch getVisaStatus userAccountId', userAccountId);
    dispatch(getVisaStatus({ userAccountId }));
  }, []);

  const pending = currentStatus === 'Pending';

  return (
    <>
      <VisaMgtPageSteper status={currentStep} />
      <Box sx={{ width: '60%', margin: '0 auto' }}>
        {pending ? (
          <VisaMgtPendingBoard message={currentStep} files={files} />
        ) : (
          <VisaUpload message={rejFeedback} fileName={currentStep} />
        )}
      </Box>
    </>
  );
};

export default VisaStatusMgtPage;
