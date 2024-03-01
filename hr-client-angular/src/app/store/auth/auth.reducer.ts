import { createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { AuthActions } from './auth.actions';
import { AuthState } from './auth.models';

// Initial state of the auth module
export const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  // Handle login action
  on(AuthActions.login, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  // Handle login success action
  on(AuthActions.loginsuccess, (state, { user }) =>
    produce(state, (draft) => {
      draft.user = user;
      draft.isLoggedIn = true;
      draft.isLoading = false;
    })
  ),

  // Handle login failure action
  on(AuthActions.loginfailure, (state, { error }) =>
    produce(state, (draft) => {
      draft.error = error;
      draft.isLoading = false;
    })
  ),

  // Handle logout action
  on(AuthActions.logout, (state) =>
    produce(state, (draft) => {
      draft.user = null;
      draft.isLoggedIn = false;
    })
  )

  // other actions...
);
