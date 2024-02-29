/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoggedIn, selectorCurrentUser } from '../store/slices/authSlice.js';

import NavBar from './NavBar.jsx';

function ProtectedRoute({ component: Component, checkOnboarding = false }) {
  const isAuthenticated = () => (!!localStorage.getItem('jwtToken'));
  const isOnboarded = () => localStorage.getItem('onboardingStatus') === 'Completed';
  // const isOnboarded = () => localStorage.getItem('onboardingStatus') === 'approved';
  const location = useLocation();

  const user = useSelector(selectorCurrentUser);
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
