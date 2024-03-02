import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import * as housingApiService from "../../apiServices/housing.js";
import { logout } from "./authSlice.js";

const initialState = {
  house: null,
  isLoading: false,
  error: null,
};

// async thunk for housing
export const getHousing = createAsyncThunk(
  "housing/getHousing",
  async (_, thunkAPI) => {
    try {
      const response = await housingApiService.getHousing();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  },
);

export const housingSlice = createSlice({
  name: "housing",
  initialState,
  reducers: {},
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
        state.error = action.payload;
      })
      // logout clean state
      .addCase(logout, () => initialState);
  },
});

export default housingSlice.reducer;

// selectors
const selectHousingState = (state) => state.housing;
// get housing data
export const selectorCurrentHouseData = createSelector(
  selectHousingState,
  (state) => state.house,
);

// check if state is loading
export const selectIsHousingLoading = createSelector(
  selectHousingState,
  (state) => state.isLoading,
);

// get any error
export const selectHousingError = createSelector(
  selectHousingState,
  (state) => state.error,
);
