/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectorCurrentUser } from '../store/slices/authSlice.js';

import NavBar from './NavBar.jsx';

function ProtectedRoute({ component: Component, checkOnboarding = false }) {
  const user = useSelector(selectorCurrentUser);
  const { onboardingStatus } = user || 'Not Started';

  const isAuthenticated = () => (!!localStorage.getItem('jwtToken'));
  const isOnboarded = () => onboardingStatus === 'Completed';
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (checkOnboarding && !isOnboarded()) {
    return <Navigate to="/onboarding-status" replace />;
  }
  return (
    <>
      {['/', '/profile', '/visa', '/housing'].includes(location.pathname) && <NavBar />}
      <Component />
    </>
  );
}

export default ProtectedRoute;
