import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';
import onboardingReducer from './slices/onboardingSlice.js';
import userProfileReducer from './slices/userProfileSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    userProfile: userProfileReducer,
    // other reducers can go here
  },
});

export default store;
