import { createReducer, on } from '@ngrx/store';
import { RegistrationTokenActions} from '../actions/registrationToken.actions'
import { RegistrationTokenState } from "../models/hiring.models"
import { produce } from 'immer';

export const initialRegistrationTokenState: RegistrationTokenState = { registrationTokens: [], isLoading: false, error: null };

export const registrationTokenReducer = createReducer(
  initialRegistrationTokenState,
  on(RegistrationTokenActions.loadtokensstart,(state)=>produce(state, (draft) => {
    draft.isLoading = true;
    draft.error = null;
  })),
  on(RegistrationTokenActions.loadtokenssuccess, (state) => (produce(state,(draft)=>{
    draft.registrationTokens;
    draft.isLoading= false;
  }))),
  on(RegistrationTokenActions.loadtokensfailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
  // GENERATE TOKENS
  on(RegistrationTokenActions.generateregistrationtoken, (state, { input }) => ({
    ...state,
    latestRegistrationToken: input,
    isLoading: false
  })),
    on(RegistrationTokenActions.generateregistrationtokensuccess, (state, { input }) => ({
    ...state,
    latestRegistrationToken: input, 
    isLoading: false
  })),
  on(RegistrationTokenActions.generateregistrationtokenfailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false
  })),
);

