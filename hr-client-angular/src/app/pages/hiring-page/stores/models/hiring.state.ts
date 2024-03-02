import {RegistrationToken} from '../models/registrationToken.model'
import {Onboarding} from '../models/onboarding.model'


export interface OnboardingState {
    onboardings: Onboarding[]; // db type
    isLoading: boolean;
    error: any;
  }
  
  export interface RegistrationTokenState {
    registrationTokens: RegistrationToken[]; // db type
    isLoading: boolean;
    error: any;
  }
  
  export interface HiringState {
    employees: OnboardingState;
    registrationTokens: RegistrationTokenState;
  }
  