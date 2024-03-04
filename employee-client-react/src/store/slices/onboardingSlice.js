import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import * as onboardingApiService from "../../apiServices/onboarding.js";
import { logout } from "./authSlice.js";
import axios from "axios";
import fileTypes from "../../constants/fileTypes.js";

const initialState = {
  onboardingData: null,
  isLoading: false,
  error: null,
};

// async thunk for onboarding
export const getOnboarding = createAsyncThunk(
  "onboarding/getOnboarding",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await onboardingApiService.getOnboarding(userId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  },
);

export const submitOnboarding = createAsyncThunk(
  "onboarding/submitOnboarding",
  async (onboardingData, thunkAPI) => {
    try {
      // upload files to AWS S3
      const profilePictureFile = onboardingData.personalInfo?.profilePictureUrl || null;
      const workAuthorizationFile = onboardingData.citizenshipStatus.workAuthorization === 'F1(CPT/OPT)' ? onboardingData.citizenshipStatus.workAuthorizationFiles[0].docUrl : null;
      const driverLicenseCopyFile = onboardingData.driverLicense.hasDriverLicense ? onboardingData.driverLicense.driverLicenseCopyUrl : null;

      if (profilePictureFile) {
        const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({ fileType: fileTypes.AVATAR });
        const presignedUrl = presignedUrlResponse.data.url;
        await axios.put(presignedUrl, profilePictureFile, {
          headers: {
            'Content-Type': profilePictureFile.type,
          },
        });

        onboardingData.personalInfo.profilePictureUrl = presignedUrl.split('?')[0];
      }

      console.log("workAuthorizationFile before", workAuthorizationFile);

      if (workAuthorizationFile) {
        const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({ fileType: fileTypes.OPT_RECEIPT });
        const presignedUrl = presignedUrlResponse.data.url;

        await axios.put(presignedUrl, workAuthorizationFile, {
          headers: {
            'Content-Type': workAuthorizationFile.type,
          },
        });
        onboardingData.citizenshipStatus.workAuthorizationFiles[0].docUrl = presignedUrl.split('?')[0];
      }

      console.log("workAuthorizationFile after", workAuthorizationFile);

      if (driverLicenseCopyFile) {
        const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({ fileType: fileTypes.DRIVER_LICENSE });
        const presignedUrl = presignedUrlResponse.data.url;

        await axios.put(presignedUrl, driverLicenseCopyFile, {
          headers: {
            'Content-Type': driverLicenseCopyFile.type,
          },
        });
        onboardingData.driverLicense.driverLicenseCopyUrl = presignedUrl.split('?')[0];
      }

      // post form to the server
      const response =
        await onboardingApiService.postOnboarding(onboardingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  },
);

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    // reducers for onboarding
  },
  extraReducers: (builder) => {
    builder
      // getOnboarding
      .addCase(getOnboarding.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOnboarding.fulfilled, (state, action) => {
        state.isLoading = false;
        state.onboardingData = action.payload.onboardingData;
      })
      .addCase(getOnboarding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // submitOnboarding
      .addCase(submitOnboarding.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitOnboarding.fulfilled, (state, action) => {
        state.isLoading = false;
        state.onboardingData = action.payload;
      })
      .addCase(submitOnboarding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // logout clean state
      .addCase(logout, () => initialState);
  },
});

export default onboardingSlice.reducer;

// selectors
const selectOnboardingState = (state) => state.onboarding;
// get onboarding data
export const selectorCurrentOnboardingData = createSelector(
  selectOnboardingState,
  (state) => state.onboardingData,
);

// check if state is loading
export const selectIsOnboardingLoading = createSelector(
  selectOnboardingState,
  (state) => state.isLoading,
);

// get any error
export const selectOnboardingError = createSelector(
  selectOnboardingState,
  (state) => state.error,
);
