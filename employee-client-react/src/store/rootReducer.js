import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { logout } from './slices/authSlice.js';
import userProfileReducer from './slices/userProfileSlice.js';
// ... import other reducers

const appReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  // ... other reducers
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
