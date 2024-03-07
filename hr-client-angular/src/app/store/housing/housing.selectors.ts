import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HousingState } from './housing.models';

export const selectHousingState = createFeatureSelector<HousingState>('housing');

export const selectHousingSummaries = createSelector(
    selectHousingState,
    (state: HousingState) => state.HousingSummaries
);

export const selectHousingProfileById = (housingId: string) =>
  createSelector(
    selectHousingState,
    (state: HousingState) => state.HousingFullInfo?.find(
        (profile) =>
          profile._id == housingId
      )
);

export const selectLoading = createSelector(
  selectHousingState,
  (state: HousingState) => state.isLoading
);

export const selectError = createSelector(
  selectHousingState,
  (state: HousingState) => state.error
);