import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as housingApiService from '../../apiServices/housing.js';

const initialState = {
  house: null,
  isLoading: false,
  error: null,
};

// async thunk for housing
export const getHousing = createAsyncThunk('housing/getHousing', async (_, thunkAPI) => {
  try {
    const response = await housingApiService.getHousing();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    // getHousing
      .addCase(getHousing.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHousing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.house = action.payload.house;
      })
      .addCase(getHousing.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default housingSlice.reducer;

// selectors
// get housing data
export const selectorCurrentHouseData = (state) => state.housing.house;

// check if state is loading
export const selectIsHousingLoading = (state) => state.housing.isLoading;

// get any error
export const selectHousingError = (state) => state.housing.error;
