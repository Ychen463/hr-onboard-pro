import { createAction, props } from '@ngrx/store';
import { Visa } from '../../pages/visa-page/interfaces/visa.model';

// GET Visa
export const getVisas = createAction('[Visa] Get Visas');
export const getVisasSuccess = createAction(
  '[Visa] Get Visas Success',
  props<{ visas: Visa[] }>() 
);
export const getVisasFail = createAction(
  '[Visa] Get Visas Fail',
  props<{ error: any }>() 
);
// GET BY ID
export const selectVisaByUserAccountId = createAction(
    '[Visa] Select Visa By UserAccountId',
    props<{ visa: Visa }>() 
  );

// UPDATE HR Decision
export const updateHRDecision = createAction(
  '[Visa] Update HR Decision with Feedback',
  props<{ userAccountId: string, documentType: string, hrDecision: string, rejFeedback?: string }>()
);
export const updateHRDecisionFailure = createAction(
  '[Visa] Update HR Decision Failure',
  props<{ error: any }>() 
);
  