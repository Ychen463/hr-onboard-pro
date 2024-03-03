import * as React from 'react';
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionValidate,
  selectIsLoggedIn,
  selectAuthError,
  selectIsAuthLoading,
} from "../store/slices/authSlice"

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const AuthGuard = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(sessionValidate());
  }, []);


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">{ error }</Alert>
    );
  }
  
  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
