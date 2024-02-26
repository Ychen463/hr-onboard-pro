import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as onboardingApiService from '../../apiServices/onboarding.js';

const initialState = {
  onboardingData: null,
  isLoading: false,
  error: null,
};

// async thunk for onboarding
export const getOnboarding = createAsyncThunk(
  'onboarding/getOnboarding',
  async ({ userAccountId }, thunkAPI) => {
    try {
      const response = await onboardingApiService.getOnboarding(userAccountId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const submitOnboarding = createAsyncThunk(
  'onboarding/submitOnboarding',
  async (onboardingData, thunkAPI) => {
    try {
      const response = await onboardingApiService.postOnboarding(onboardingData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const onboardingSlice = createSlice({
  name: 'onboarding',
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  },
});

export default onboardingSlice.reducer;

// selectors
// get onboarding data
export const selectorCurrentOnboardingData = (state) => state.onboarding.onboardingData;

// check if state is loading
export const selectIsOnboardingLoading = (state) => state.onboarding.isLoading;

// get any error
export const selectOnboardingError = (state) => state.onboarding.error;
