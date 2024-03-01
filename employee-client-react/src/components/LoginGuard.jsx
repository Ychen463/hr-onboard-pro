import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  sessionValidate,
  selectIsLoggedIn,
  selectAuthError,
  selectIsAuthLoading,
} from "../store/slices/authSlice";

const LoginGuard = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedIn);
  console.log("in login guard is logged in", isLoggedin);
  const isLoading = useSelector(selectIsAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(sessionValidate());
  }, [dispatch]);

  return isLoggedin ? <Navigate to="/" /> : <Outlet />;
};

export default LoginGuard;
