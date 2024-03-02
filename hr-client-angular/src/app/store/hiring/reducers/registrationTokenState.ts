import {GenerateRegistrationTokenInput} from '../models/registrationToken.model'

export interface RegistrationTokenState {
  tokens: GenerateRegistrationTokenInput[];
  latestRegistrationToken?: GenerateRegistrationTokenInput; 
  isLoading: boolean;
  error: any;
}

export const initialState: RegistrationTokenState = {
  tokens: [],
  isLoading: false,
  error: null
};
