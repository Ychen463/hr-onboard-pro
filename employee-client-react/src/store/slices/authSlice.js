import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authApiService from '../../apiServices/auth.js';

const initialState = {
  user: null,
  isLoggedIn: false,
  registrationToken: null,
  isRegistering: false,
  isLoading: false,
  error: null,
};

// async thunk for registration
export const registration = createAsyncThunk(
  'auth/registration',
  async ({ username, password, email }, thunkAPI) => {
    try {
      const token = thunkAPI.getState((state) => state.registrationToken);
      const response = await authApiService.register({
        username, password, email, token,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authApiService.login({ username, password });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const sessionValidate = createAsyncThunk(
  'auth/session',
  async (_, thunkAPI) => {
    try {
      const response = await authApiService.getJWTtokenValidation();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer for logout
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // registration
      .addCase(registration.pending, (state) => {
        state.isRegistering = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isRegistering = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isRegistering = false;
        state.error = action.error.message;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      })
      // session validate
      .addCase(sessionValidate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sessionValidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(sessionValidate.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.error.message;
      });
  },
});

export const {
  logout,
} = authSlice.actions;

export default authSlice.reducer;
