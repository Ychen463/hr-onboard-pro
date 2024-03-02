import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorCurrentUser } from "../store/slices/authSlice";

const OnboardingGuard = () => {
  const currentUser = useSelector(selectorCurrentUser);
  const needsOnboardingStatus = currentUser.onboardingStatus !== "Completed";

  return needsOnboardingStatus ? <Outlet /> : <Navigate to="/" />;
};

export default OnboardingGuard;
