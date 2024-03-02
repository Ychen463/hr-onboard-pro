import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegistrationToken, GenerateRegistrationTokenInput } from '../../../pages/hiring-page/interfaces/registrationToken.model';


export const RegistrationTokenActions = createActionGroup({
    source: 'RegistrationToken',
    events: {
      loadTokensStart: emptyProps(),
      loadTokensSuccess:props<{ registrationTokens: RegistrationToken[] }>(),
      loadTokensFailure: props<{ error: any }>(),

      generateRegistrationToken: props<{ input: GenerateRegistrationTokenInput }>(),
      generateRegistrationTokenSuccess: props<{ input: GenerateRegistrationTokenInput }>(),
      generateRegistrationTokenFailure: props<{ error: any }>(),
    },
  });