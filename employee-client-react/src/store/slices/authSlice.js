import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import * as authApiService from "../../apiServices/auth.js";

const initialState = {
  user: null,
  registrationInfo: null,
  isRegistrationTokenValid: false,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

// async thunk for registration
export const getRegistrationInfo = createAsyncThunk(
  'auth/getRegistrationInfo',
  async (token, thunkAPI) => {
    try {
      const response = await authApiService.getRegistrationTokenUsage(token);
      localStorage.setItem('registrationToken', response.data.token);
      return response.data;
    } catch (error) {
      console.log("authslice", error);
      return thunkAPI.rejectWithValue(error.data.message);
    }
  }
)

export const registration = createAsyncThunk(
  "auth/registration",
  async ({ username, password }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const registrationToken = state.auth.registrationInfo.token;
      console.log("registrationToken", registrationToken);
      const response = await authApiService.register({
        username,
        password,
        registrationToken
      });
      localStorage.setItem("jwtToken", response.data.loginJwtToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    } finally {
      localStorage.removeItem("registrationToken");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await authApiService.login({ username, password });
      localStorage.setItem("jwtToken", response.data.loginJwtToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  },
);

export const sessionValidate = createAsyncThunk(
  "auth/session",
  async (_, thunkAPI) => {
    try {
      const response = await authApiService.getJWTtokenValidation();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data.message);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
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
      // getRegistrationInfo
      .addCase(getRegistrationInfo.pending, (state) => {
        state.registrationInfo = null;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRegistrationInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistrationTokenValid = true;
        state.registrationInfo = action.payload;
      })
      .addCase(getRegistrationInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isRegistrationTokenValid = false;
        state.error = action.payload;
      })
      // registration
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.registrationInfo = null;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      // session validate
      .addCase(sessionValidate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sessionValidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(sessionValidate.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload;
      })
      // logout clean state
      .addCase(logout, () => initialState);
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

// selectors
const selectAuthState = (state) => state.auth;
// get registration info
export const selectRegistrationInfo = createSelector(
  selectAuthState,
  (state) => state.registrationInfo,
);
// get isRegistrationTokenValid
export const selectIsRegistrationTokenValid = createSelector(
  selectAuthState,
  (state) => state.isRegistrationTokenValid,
);

// get user data
export const selectorCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user,
);

// check if the user is logged in
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isLoggedIn,
);

// check if an authentication-related process is loading
export const selectIsAuthLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading,
);

// get any authentication-related error
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error,
);

// get registrationToken
export const selectRegistrationToken = createSelector(
  selectAuthState,
  (state) => state.registrationInfo.token,
);
