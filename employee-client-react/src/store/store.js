import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import onboardingReducer from "./slices/onboardingSlice.js";
import housingReducer from "./slices/housingSlice.js";
import visaReducer from "./slices/visaSlice.js";
import userProfileReducer from "./slices/userProfileSlice.js";
import facilityReportReducer from "./slices/facilityReportSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    housing: housingReducer,
    visa: visaReducer,
    userProfile: userProfileReducer,
    facilityReports: facilityReportReducer,
    // other reducers can go here
  },
});

export default store;
