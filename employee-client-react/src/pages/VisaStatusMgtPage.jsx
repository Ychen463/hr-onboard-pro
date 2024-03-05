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

import { docUrlExample } from '../constants/docUrlExample.js';

const VisaStatusMgtPage = () => {
  const dispatch = useDispatch();

  const visaData = useSelector(selectorVisa);
  const currentStep = visaData?.currentStep;
  const rejFeedback = visaData?.rejFeedback || '';
  const currentStatus = visaData?.currentStatus || '';
  const visaDocUrl = currentStep === 'I983' ? docUrlExample : visaData?.docUrl;

  const selectVisaErrorMessage = useSelector(selectVisaError);
  const currentUserData = useSelector(selectorCurrentUser);
  const userAccountId = currentUserData.userId;

  useEffect(() => {
    dispatch(getVisaStatus({ userAccountId }));
  }, []);

  const pending = currentStatus === 'Pending';

  return (
    <>
      <VisaMgtPageSteper status={currentStep} />
      <Box sx={{ width: '60%', margin: '0 auto' }}>
        {pending ? (
          <VisaUpload message={rejFeedback} fileName={currentStep} />
        ) : (
          <VisaMgtPendingBoard />
        )}
      </Box>
    </>
  );
};

export default VisaStatusMgtPage;
