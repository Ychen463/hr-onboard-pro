// src/app/store/onboarding/onboarding.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { loadOnboarding, loadOnboardingSuccess, loadOnboardingFailure } from '../actions/onboarding-details.actions';
import { OnboardingState } from '../models/hiring.models'; 
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

export const onboardingReducer = createReducer(
  initialState,
  on(loadOnboarding, (state) => ({ ...state, isLoading: true })), 
  on(loadOnboardingSuccess, (state, { onboardingData }) => ({ ...state, onboardingData, 
    error: null, isLoading: false })),
  on(loadOnboardingFailure, (state, { error }) => ({ ...state, error, onboardingData: null, isLoading: false }))
);
