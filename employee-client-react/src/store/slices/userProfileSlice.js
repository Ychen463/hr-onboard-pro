import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userProfile: {},
  // Add other user-related state
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // Define reducers for user profile management
  },
});

export const { updateUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
