import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userProfileApiService from '../../apiServices/userProfile.js';
import { logout } from './authSlice.js';

const initialState = {
  userProfile: null,
  isLoading: false,
  error: null,
};

// async thunk for userProfile
export const getUserProfile = createAsyncThunk(
  'userProfile/getUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await userProfileApiService.getUserProfile();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async (newProfile, thunkAPI) => {
    try {
      // check if docs has been updated by comparing with state.userProfile.userProfile
      // if has doc changes
      // need to do aws s3 request here
      const response = await userProfileApiService.updateUserProfile(newProfile);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    // Define reducers for user profile management
  },
  extraReducers: (builder) => {
    builder
      // getUserProfile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload.profile;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.data;
      })
      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload.updatedProfile;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.data;
      })
      // logout clean state
      .addCase(logout, () => initialState);
  },
});

export default userProfileSlice.reducer;

// selectors
// get userProfile
export const selectorUserProfile = (state) => state.userProfile.userProfile;

// check if state is loading
export const selectIsUserProfileLoading = (state) => state.userProfile.isLoading;

// get any error
export const selectUserProfileError = (state) => state.userProfile.error;
