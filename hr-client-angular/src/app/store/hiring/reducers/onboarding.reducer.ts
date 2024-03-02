// src/app/reducers/user.reducer.ts
import { createReducer, on } from '@ngrx/store';

import { loadOnboardingsFailure, loadOnboardingsStart, loadOnboardingsSuccess, updateOnboardingFail, updateOnboardingStart, updateOnboardingSuccess,  } from '../actions/onboarding.actions';
import { OnboardingState } from '../models/hiring.state'

export const initialOnboardingState: OnboardingState = { 
  onboardings: [], 
  isLoading: false, 
  error: null 
};

export const onboardingReducer = createReducer(
  initialOnboardingState,
  on(loadOnboardingsStart, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(loadOnboardingsSuccess, (state, { onboardings }) => ({
    ...state,
    isLoading: false,
    onboardings
  })),
  on(loadOnboardingsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // UPDATE ONLOADING
  on(updateOnboardingStart, (state, { userAccountId, onboardingStatus, rejFeedback }) => ({
    ...state,
    onboardings: state.onboardings.map(onboarding =>
      onboarding.userAccountId === userAccountId
        ? { ...onboarding, onboardingStatus, rejFeedback: rejFeedback || onboarding.rejFeedback }
        : onboarding
    ),
    isLoading: true, 
  })),
  on(updateOnboardingSuccess, (state, { userAccountId, onboardingStatus, rejFeedback }) => ({
    ...state,
    onboardings: state.onboardings.map(onboarding =>
      onboarding.userAccountId === userAccountId
        ? { ...onboarding, onboardingStatus, rejFeedback: rejFeedback || onboarding.rejFeedback }
        : onboarding
    ),
    isLoading: false,
  })),
  on(updateOnboardingFail, (state, { error, userAccountId }) => ({
    ...state,
    error, 
    isLoading: false,
  }))
  
  
)
