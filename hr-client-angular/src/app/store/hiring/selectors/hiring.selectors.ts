// src/app/store/selectors/hiring.selectors.ts

import { HiringState, OnboardingState, RegistrationTokenState } from '../models/hiring.models';
import { Onboarding } from '../../../pages/hiring-page/interfaces/onboarding.model'
import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { HiringState, OnboardingState, RegistrationTokenState } from './hiring.state';

// Feature selectors
const selectHiringFeature = createFeatureSelector<HiringState>('hiringFeatureKey');

const selectEmployeeFeature = createSelector(
  selectHiringFeature,
  (state: HiringState) => state.employees
);

const selectRegistrationTokenFeature = createSelector(
  selectHiringFeature,
  (state: HiringState) => state.registrationTokens
);

// Onboarding selectors
export const selectAllOnboardings = createSelector(
  selectEmployeeFeature,
  (state: OnboardingState) => state.onboardings
);

export const selectOnboardingIsLoading = createSelector(
  selectEmployeeFeature,
  (state: OnboardingState) => state.isLoading
);

export const selectOnboardingError = createSelector(
  selectEmployeeFeature,
  (state: OnboardingState) => state.error
);

// RegistrationToken selectors
export const selectAllRegistrationTokens = createSelector(
  selectRegistrationTokenFeature,
  (state: RegistrationTokenState) => state.registrationTokens
);

export const selectRegistrationTokenIsLoading = createSelector(
  selectRegistrationTokenFeature,
  (state: RegistrationTokenState) => state.isLoading
);

export const selectRegistrationTokenError = createSelector(
  selectRegistrationTokenFeature,
  (state: RegistrationTokenState) => state.error
);

// Onboarding by UserAccountId selector
export const selectOnboardingByAccountId = (userAccountId: string) => createSelector(
  selectAllOnboardings,
  (onboardings) => onboardings.find(onboarding => onboarding.userAccountId === userAccountId)
);
