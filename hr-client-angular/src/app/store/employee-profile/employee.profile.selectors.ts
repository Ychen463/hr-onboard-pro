import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProfileState } from './employee.profile.models';

export const selectProfileSummaryState = createFeatureSelector<ProfileState>('employeeProfile');

export const selectAllProfileSummaries = createSelector(
  selectProfileSummaryState,
  (state: ProfileState) => state.ProfileSummaries
);

export const selectProfileSummariesByName = (name: string) =>
  createSelector(selectProfileSummaryState, (state: ProfileState) =>
    state.ProfileSummaries?.filter(
      (profile) =>
        profile.firstName.toLowerCase().includes(name.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(name.toLowerCase()) ||
        profile.preferredName?.toLowerCase().includes(name.toLowerCase())
    )
  );

export const selectLoading = createSelector(
  selectProfileSummaryState,
  (state: ProfileState) => state.isLoading
);

export const selectError = createSelector(
  selectProfileSummaryState,
  (state: ProfileState) => state.error
);