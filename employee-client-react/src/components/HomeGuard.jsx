import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectorCurrentUser } from '../store/slices/authSlice';

const HomeGuard = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const isOnboardingStatus = currentUser.onboardingStatus === 'Completed';

  return isOnboardingStatus ? <Outlet /> : <Navigate to="/onboarding-status" />;
};

export default HomeGuard;
