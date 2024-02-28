import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

// Feature selector for auth state
const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector to get the entire auth state
export const selectAuth = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

// Selector to get the current user
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// Selector to check if the user is logged in
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

// Selector to check if an auth related process is loading
export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

// Selector to get the current auth error
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
