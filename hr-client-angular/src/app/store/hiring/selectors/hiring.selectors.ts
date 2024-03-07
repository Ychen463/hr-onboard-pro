// src/app/store/selectors/hiring.selectors.ts

import { Observable, map } from 'rxjs';
import { HiringState, OnboardingState, RegistrationTokenState } from '../models/hiring.models';
import { createSelector } from '@ngrx/store';
import { Onboarding } from 'src/app/pages/hiring-page/interfaces/onboarding.model';

export const selectOnboardingState = (state: HiringState) => state.onboardings;
export const selectRegistrationTokenState = (state: HiringState) => state.registrationTokens;




// Onboarding selectors
export const selectAllOnboardings = createSelector(
  selectOnboardingState,
  (state: OnboardingState) => state.onboardings
);

export const selectOnboardingIsLoading = createSelector(
  selectOnboardingState,
  (state: OnboardingState) => state.isLoading
);

export const selectOnboardingError = createSelector(
  selectOnboardingState,
  (state: OnboardingState) => state.error
);

// RegistrationToken selectors
export const selectAllRegistrationTokens = createSelector(
  selectRegistrationTokenState,
  (state: RegistrationTokenState) => state.registrationTokens
);

export const selectRegistrationTokenIsLoading = createSelector(
  selectRegistrationTokenState,
  (state: RegistrationTokenState) => state.isLoading
);

export const selectRegistrationTokenError = createSelector(
  selectRegistrationTokenState,
  (state: RegistrationTokenState) => state.error
);

// Onboarding by UserAccountId selector
export const selectOnboardingByAccountId = createSelector(
  (state: { onboarding: OnboardingState }) => state.onboarding, 
  (_: any, props: { userAccountId: string }) => props.userAccountId,
  (onboardingState, userAccountId) => { // 返回符合预期的值
    return onboardingState.onboardings.find(onboarding => onboarding.userAccountId === userAccountId);
  }
);
