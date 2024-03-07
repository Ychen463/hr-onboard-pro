// src/app/store/onboarding/onboarding.reducer.ts

import { createReducer, createSelector, on } from '@ngrx/store';
import { loadOnboarding, loadOnboardingSuccess, loadOnboardingFailure } from '../actions/onboarding-details.actions';
import { OnboardingState } from '../models/hiring.models'; 
import { Onboarding } from 'src/app/pages/hiring-page/interfaces/onboarding.model';
export interface State {
  onboarding: OnboardingState | null;
  isLoading: boolean, 
  error: any; 
}

export const initialState: State = {
  onboarding: null,
  isLoading: false, 
  error: null 
};

export const selectOnboardingByAccountId = createSelector(
  (state: OnboardingState) => state.onboardings,
  (onboardings: Onboarding[], props: { userAccountId: string }) => onboardings.find(onboarding => onboarding.userAccountId === props.userAccountId)
);
