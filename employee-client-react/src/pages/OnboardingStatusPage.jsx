/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from '@mui/material';
import { selectorCurrentOnboardingData } from '../store/slices/onboardingSlice.js';

// eslint-disable-next-line react/prop-types
function OnboardingStatusCard() {
  const onboardingData = useSelector(selectorCurrentOnboardingData);
  const navigate = useNavigate();

  const rejFeedback = onboardingData ? onboardingData.rejFeedback : 'On boarding application rejected, contact HR for details';
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
    <Card style={{
      height: '300px', width: '500px', margin: '200px auto', display: 'flex', flexDirection: 'column',
    }}
    >
      <Typography sx={{ mt: 12, textAlign: 'center' }}>
        {onboardingData ? CONTENT[onboardingData.onboardingStatus].boardMessage : 'Please start your on boarding process'}
      </Typography>

      <Button onClick={handleStatusClick} variant="contained" sx={{ m: 14 }}>
        {onboardingData ? CONTENT[onboardingData.onboardingStatus].buttonContent : 'Start on boarding'}
      </Button>
    </Card>
  );
}

export default OnboardingStatusCard;
