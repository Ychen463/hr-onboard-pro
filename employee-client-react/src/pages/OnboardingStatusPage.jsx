import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from '@mui/material';
import { selectorCurrentUser } from '../store/slices/authSlice.js';
import { selectorCurrentOnboardingData, getOnboarding } from '../store/slices/onboardingSlice.js';
import { decodeHtml } from '../utils/decodeHtml.js';

function OnboardingStatusCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserData = useSelector(selectorCurrentUser);
  const onboardingData = useSelector(selectorCurrentOnboardingData);
  const [onboardingStatus, setOnboardingStatus] = useState(currentUserData.onboardingStatus);
  const [rejFeedback, setRejFeedback] = useState('');

  useEffect(() => {
    if (currentUserData.onboardingStatus !== 'Not Started')
      dispatch(getOnboarding({ userId: currentUserData.userId }));
  }, [currentUserData]);

  useEffect(() => {
    if (onboardingData !== null && onboardingData.rejFeedback !== '') {
      setOnboardingStatus('Rejected');
      setRejFeedback(decodeHtml(onboardingData.rejFeedback));
    }
  }, [onboardingData]);

  const CONTENT = {
    'Not Started': {
      boardMessage: 'Start on boarding process',
      buttonContent: 'Start on boarding',
    },
    Pending: {
      boardMessage: 'Onboarding application submitted, please wait for approval',
      buttonContent: 'Review submission',
    },
    Rejected: {
      boardMessage: rejFeedback,
      buttonContent: 'Edit application & Re-Submit',
    },
  };
  const handleStatusClick = () => {
    navigate('/onboarding-application');
  };
  return (
    <Card
      style={{
        height: '300px',
        width: '500px',
        margin: '200px auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ mt: 12, textAlign: 'center' }}>
        {onboardingStatus
          ? CONTENT[onboardingStatus].boardMessage
          : 'Please start your on boarding process'}
      </Typography>

      <Button onClick={handleStatusClick} variant="contained" sx={{ m: 14 }}>
        {onboardingStatus ? CONTENT[onboardingStatus].buttonContent : 'Start on boarding'}
      </Button>
    </Card>
  );
}

export default OnboardingStatusCard;
