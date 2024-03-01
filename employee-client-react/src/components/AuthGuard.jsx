import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionValidate,
  selectIsLoggedIn,
  selectAuthError,
  selectIsAuthLoading,
} from "../store/slices/authSlice";

const AuthGuard = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);

  // useEffect(() => {
  //   dispatch(sessionValidate());
  // }, [dispatch]);

  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
