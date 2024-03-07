import { createReducer, on } from '@ngrx/store';
import { ProfileState } from './employee.profile.models';
import { profileActions } from './employee.profile.actions';
import { produce } from 'immer';

const initialState: ProfileState = {
  ProfileSummaries: [],
  isLoading: false,
  error: null,
};

export const employeeProfileReducer = createReducer(
  initialState,

  on(profileActions.addsummaries, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  on(profileActions.addsummariessuccess, (state, { profileList }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.ProfileSummaries = profileList;
    })
  ),

  on(profileActions.addsummariesfail, (state, { error }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = `addsummariesfail: ${error}`;
    })
  )
);
