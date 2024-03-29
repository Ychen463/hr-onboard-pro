import { createAction, props } from '@ngrx/store';
// import { Onboarding  } from '../models/onboarding.model';
import { Onboarding  } from '../../../pages/hiring-page/interfaces/onboarding.model';


export const loadOnboardingsStart = createAction('[Onboarding API] Load Start');
export const loadOnboardingsSuccess = createAction('[Onboarding API] Load Success', props<{ onboardings: Onboarding[] }>());
export const loadOnboardingsFailure = createAction('[Onboarding API] Load Failure', props<{ error: any }>());

export const approveOnboardingStart = createAction('[Approve Onboarding] Load Start', props<{ userAccountId: string; newStatus: string }>());
export const approveOnboardingSuccess = createAction('[Approve Onboarding] Load Success', props<{ userAccountId: string }>());
export const approveOnboardingFail = createAction('[Approve Onboarding] Load Fail', props<{ error: string; userAccountId: string }>());

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

export function getOnboardingDatesByUserAccountId(getOnboardingDatesByUserAccountId: any, arg1: (state: import("../../visa/visa.models").VisaState, { userAccountId }: any) => import("../../visa/visa.models").VisaState): import("@ngrx/store").ReducerTypes<import("../../visa/visa.models").VisaState, readonly import("@ngrx/store").ActionCreator[]> {
    throw new Error('Function not implemented.');
}
export const getDatesByUserAccountId = createAction(
  '[Onboarding] Get Onboarding Dates By UserAccountId',
  props<{ userAccountId: string }>()
);