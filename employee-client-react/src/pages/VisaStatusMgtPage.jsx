import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

import VisaMgtPageSteper from '../components/VisaMgtComponents/VisaMgtPageSteper';
import FileListTable from '../components/FileListTable';
import { selectorCurrentUser } from '../store/slices/authSlice.js';
import {
  getVisaStatus,
  selectorVisa,
  submitOptEAD,
  submiti983,
  submiti20,
  selectOurVisaStatus,
} from '../store/slices/visaSlice.js';
import { selectVisaError } from '../store/slices/visaSlice.js';
import { VisaMgtPendingBoard } from '../components/VisaMgtComponents/VisaMgtPendingBoard.jsx';
import VisaUpload from '../components/VisaMgtComponents/VisaUpload.jsx';
import currentDocOfPage from '../utils/visaHelper.js';

import { docUrlExample } from '../constants/docUrlExample.js';

const VisaStatusMgtPage = () => {
  const dispatch = useDispatch();

  const visaStatus = useSelector(selectorVisa);
  const currentUser = useSelector(selectorCurrentUser);
  const currentStep = visaStatus?.currentStep;
  const rejFeedback = visaStatus?.rejFeedback || '';
  const currentStatus = visaStatus?.currentStatus || '';
  const ourVisaStatus = useSelector(selectOurVisaStatus);
  const [uploadFile, setUploadFile] = useState();

  const selectVisaErrorMessage = useSelector(selectVisaError);
  const currentUserData = useSelector(selectorCurrentUser);
  const userAccountId = currentUserData.userId;

  useEffect(() => {
    dispatch(getVisaStatus({ userAccountId }));
  }, [userAccountId]);

  if (currentUser.visaStatus === 'I20-Approved') {
    return <Typography>Visa Submit Completed!</Typography>;
  }

  // const pending = currentStatus === 'Pending';
  const pending = ourVisaStatus?.currentStatus === 'Pending';
  console.log('ourVisaStatus', ourVisaStatus);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const submitFile = () => {
    if (
      (ourVisaStatus.currentStep === 'OPT Receipt' && ourVisaStatus.currentStatus === 'Approved') ||
      (ourVisaStatus.currentStep === 'OPT EAD' && ourVisaStatus.currentStatus !== 'Approved')
    ) {
      dispatch(
        submitOptEAD({
          docUrl: 'https://bf-employee-hr-portal.s3.us-east-2.amazonaws.com/Format/optEAD.pdf',
          userAccountId,
        })
      );
    } else if (
      (ourVisaStatus.currentStep === 'OPT EAD' && ourVisaStatus.currentStatus === 'Approved') ||
      (ourVisaStatus.currentStep === 'I983' && ourVisaStatus.currentStatus !== 'Approved')
    ) {
      dispatch(
        submiti983({
          docUrl: 'https://bf-employee-hr-portal.s3.us-east-2.amazonaws.com/Format/i983.pdf',
          userAccountId,
        })
      );
    } else if (
      (ourVisaStatus.currentStep === 'I983' && ourVisaStatus.currentStatus === 'Approved') ||
      (ourVisaStatus.currentStep === 'I20' && ourVisaStatus.currentStatus !== 'Approved')
    ) {
      dispatch(
        submiti20({
          docUrl: 'https://bf-employee-hr-portal.s3.us-east-2.amazonaws.com/Format/i20.pdf',
          userAccountId,
        })
      );
    }
  };

  return (
    <>
      <VisaMgtPageSteper
        status={getCurrentDoc(ourVisaStatus?.currentStep, ourVisaStatus?.currentStatus)}
      />
      <Box sx={{ width: '60%', margin: '0 auto' }}>
        {pending ? (
          <VisaMgtPendingBoard
            message={getCurrentDoc(ourVisaStatus?.currentStep, ourVisaStatus?.currentStatus)}
            files={files}
          />
        ) : (
          <>
            <VisaUpload
              message={ourVisaStatus?.rejFeedback}
              fileName={getCurrentDoc(ourVisaStatus?.currentStep, ourVisaStatus?.currentStatus)}
              handleFileChange={handleFileChange}
            />
            <Button onClick={submitFile}>Submit</Button>
          </>
        )}
      </Box>
    </>
  );
};

const getCurrentDoc = (currentStep, currentStatus) => {
  let currentDoc = '';

  if (
    (currentStep === 'OPT Receipt' && currentStatus === 'Approved') ||
    (currentStep === 'OPT EAD' && currentStatus !== 'Approved')
  ) {
    currentDoc = 'OPT EAD';
  } else if (
    (currentStep === 'OPT EAD' && currentStatus === 'Approved') ||
    (currentStep === 'I983' && currentStatus !== 'Approved')
  ) {
    currentDoc = 'I983';
  } else if (
    (currentStep === 'I983' && currentStatus === 'Approved') ||
    (currentStep === 'I20' && currentStatus !== 'Approved')
  ) {
    currentDoc = 'I20';
  }
  return currentDoc;
};

export default VisaStatusMgtPage;
