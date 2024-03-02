import {RegistrationToken} from './registrationToken.model'
import {Onboarding} from './onboarding.model'


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
  