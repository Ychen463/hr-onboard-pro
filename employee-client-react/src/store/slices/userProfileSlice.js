import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import * as userProfileApiService from "../../apiServices/userProfile.js";
import { logout } from "./authSlice.js";
import * as onboardingApiService from "../../apiServices/onboarding.js";
import axios from "axios";
import fileTypes from "../../constants/fileTypes.js";
const initialState = {
  userProfile: null,
  isLoading: false,
  error: null,
};


// async thunk for userProfile
export const getUserProfile = createAsyncThunk(
  "userProfile/getUserProfile",
  async (_, thunkAPI) => {
    try {
      const response = await userProfileApiService.getUserProfile();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "userProfile/updateUserProfile",
  async (newProfile, thunkAPI) => {
    try {
      // upload files to AWS S3
      console.log("thunk updateUserProfile newProfile", newProfile);
      const profilePictureFile = newProfile.personalInfo?.profilePictureUrl || null;
      const driverLicenseCopyFile = newProfile.driverLicense.hasDriverLicense ? newProfile.driverLicense.driverLicenseCopyUrl : null;

      // if (profilePictureFile && profilePictureFile?.type) {
      //   const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({ fileType: fileTypes.AVATAR });
      //   const presignedUrl = presignedUrlResponse.data.url;
      //   console.log("presignedUrl", presignedUrl);
      //   await axios.put(presignedUrl, profilePictureFile, {
      //     headers: {
      //       'Content-Type': profilePictureFile.type,
      //     },
      //   });
      //   console.log("presignedUrl", presignedUrl);

      //   newProfile.personalInfo.profilePictureUrl = presignedUrl.split('?')[0];
      // }

      // if (driverLicenseCopyFile && driverLicenseCopyFile?.type) {
      //   const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({ fileType: fileTypes.DRIVER_LICENSE });
      //   const presignedUrl = presignedUrlResponse.data.url;

      //   await axios.put(presignedUrl, driverLicenseCopyFile, {
      //     headers: {
      //       'Content-Type': driverLicenseCopyFile.type,
      //     },
      //   });
      //   newProfile.driverLicense.driverLicenseCopyUrl = presignedUrl.split('?')[0];
      // }

      const response =
        await userProfileApiService.updateUserProfile(newProfile);
      return response.data;
    } catch (error) {
      console.log("thunk update profile", error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  },
);

export const userProfileSlice = createSlice({
  name: "userProfile",
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
        state.error = action.payload;
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
        state.error = action.payload;
      })
      // logout clean state
      .addCase(logout, () => initialState);
  },
});

export default userProfileSlice.reducer;

// selectors
const selectUserProfileState = (state) => state.userProfile;
// get userProfile
export const selectorUserProfile = createSelector(
  selectUserProfileState,
  (state) => state.userProfile,
);

// check if state is loading
export const selectIsUserProfileLoading = createSelector(
  selectUserProfileState,
  (state) => state.isLoading,
);

// get any error
export const selectUserProfileError = createSelector(
  selectUserProfileState,
  (state) => state.error,
);
