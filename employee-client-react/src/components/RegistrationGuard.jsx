import * as React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRegistrationInfo,
  selectIsLoggedIn,
  selectAuthError,
  getRegistrationInfo,
} from '../store/slices/authSlice';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const RegistrationGuard = () => {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const error = useSelector(selectAuthError);
  const isLoggedin = useSelector(selectIsLoggedIn);
  const registrationInfo = useSelector(selectRegistrationInfo);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedin) {
      const query = new URLSearchParams(location.search);
      const token = query.get('token');

      console.log('token', token);

      if (token) {
        dispatch(getRegistrationInfo(token));
      } else {
        setIsTokenValid(false);
      }
    } else {
      setIsTokenValid(false);
    }
  }, [isLoggedin, location]);

  useEffect(() => {
    if (registrationInfo !== null) setIsTokenValid(true);
  }, [registrationInfo]);

  if (isTokenValid === null) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return isTokenValid ? <Outlet /> : <Navigate to="/login" />;
};

export default RegistrationGuard;
