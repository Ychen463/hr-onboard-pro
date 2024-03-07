import {RegistrationToken} from '../../../pages/hiring-page/interfaces/registrationToken.model'
import {Onboarding} from '../../../pages/hiring-page/interfaces/onboarding.model'


export interface OnboardingState {
    onboardings: Onboarding[]; // db type
    isLoading: boolean;
    error: any;
  }
  
  export interface RegistrationTokenState {
    registrationTokens: RegistrationToken[] ; // db type
    isLoading: boolean;
    error: any;
  }
  
  export interface HiringState {
    onboardings: OnboardingState;
    registrationTokens: RegistrationTokenState;
  }
  