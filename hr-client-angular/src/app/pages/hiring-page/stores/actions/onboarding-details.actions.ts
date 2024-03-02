import { createAction, props } from '@ngrx/store';
import { Onboarding  } from '../models/onboarding.model';


export const loadOnboarding = createAction(
    '[Onboarding] Load Onboarding'
  );
  export const loadOnboardingSuccess = createAction(
    '[Onboarding] Load Onboarding Success',
    props<{ onboardingData: Onboarding }>()
  );
  export const loadOnboardingFailure = createAction(
    '[Onboarding] Load Onboarding Failure',
    props<{ error: any }>()
  );

  export const updateOnboardingStart = createAction(
    '[Onboarding API] Update Onboarding Start', 
    props<{ userAccountId: string; onboardingStatus: string; rejFeedback?: string }>()
  );
  
  export const updateOnboardingSuccess = createAction(
    '[Onboarding API] Update Onboarding Success',
    props<{ userAccountId: string; onboardingStatus: string; rejFeedback?: string }>()
  );
  
  export const updateOnboardingFail = createAction(
    '[Onboarding API] Update Onboarding Fail', 
    props<{ error: string; userAccountId: string }>()
  );