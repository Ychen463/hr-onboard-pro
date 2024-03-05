import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import * as visaApiService from '../../apiServices/visa.js';
import { logout } from './authSlice.js';
import axios from 'axios';
import fileTypes from '../../constants/fileTypes.js';
import * as onboardingApiService from '../../apiServices/onboarding.js';

const initialState = {
  visa: null,
  isLoading: false,
  error: null,
};

// async thunk for visa
export const getVisaStatus = createAsyncThunk(
  'visa/getVisaStatus',
  async ({ userAccountId }, thunkAPI) => {
    try {
      const repsonse = await visaApiService.getVisaStatus(userAccountId);
      return repsonse.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const submitOptReceipt = createAsyncThunk(
  'visa/submitOptReceipt',
  async (docUrl, thunkAPI) => {
    try {
      // need to make aws s3 request first
      const response = await visaApiService.postOptReceipt(docUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
);

export const submitOptEAD = createAsyncThunk('visa/submitOptEAD', async (docUrl, thunkAPI) => {
  try {
    const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({
      fileType: fileTypes.OPT_EAD,
    });
    const presignedUrl = presignedUrlResponse.data.url;
    await axios.put(presignedUrl, docUrl, {
      headers: {
        'Content-Type': docUrl.type,
      },
    });

    docUrl = presignedUrl.split('?')[0];

    const response = await visaApiService.postOptEAD(docUrl);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const submiti983 = createAsyncThunk('visa/submiti983', async (docUrl, thunkAPI) => {
  try {
    const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({
      fileType: fileTypes.I983,
    });
    const presignedUrl = presignedUrlResponse.data.url;
    await axios.put(presignedUrl, docUrl, {
      headers: {
        'Content-Type': docUrl.type,
      },
    });

    docUrl = presignedUrl.split('?')[0];

    const response = await visaApiService.posti983(docUrl);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const submiti20 = createAsyncThunk('visa/submiti20', async (docUrl, thunkAPI) => {
  try {
    const presignedUrlResponse = await onboardingApiService.getAWSS3PresignedUrl({
      fileType: fileTypes.I20,
    });
    const presignedUrl = presignedUrlResponse.data.url;
    await axios.put(presignedUrl, docUrl, {
      headers: {
        'Content-Type': docUrl.type,
      },
    });

    docUrl = presignedUrl.split('?')[0];
    // need to make aws s3 request first
    const response = await visaApiService.posti20(docUrl);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.data.message);
  }
});

export const visaSlice = createSlice({
  name: 'visa',
  initialState,
  reducers: {
    // reducers for visa
  },
  extraReducers: (builder) => {
    builder
      // getVisaStatus
      .addCase(getVisaStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVisaStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visa = action.payload.visa;
      })
      .addCase(getVisaStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // submitOptReceipt
      .addCase(submitOptReceipt.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitOptReceipt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visa = action.payload.visa;
      })
      .addCase(submitOptReceipt.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // submitOptEAD
      .addCase(submitOptEAD.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitOptEAD.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visa = action.payload.visa;
      })
      .addCase(submitOptEAD.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // submiti983
      .addCase(submiti983.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submiti983.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visa = action.payload.visa;
      })
      .addCase(submiti983.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // submiti20
      .addCase(submiti20.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submiti20.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visa = action.payload.visa;
      })
      .addCase(submiti20.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // logout clean state
      .addCase(logout, () => initialState);
  },
});

export default visaSlice.reducer;

// selectors
const selectVisaState = (state) => state.visa;
// get current visa status
export const selectorVisa = createSelector(selectVisaState, (state) => state.visa);

// check if state is loading
export const selectIsVisaLoading = createSelector(selectVisaState, (state) => state.isLoading);

// get any error
export const selectVisaError = createSelector(selectVisaState, (state) => state.error);
