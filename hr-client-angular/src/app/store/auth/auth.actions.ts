import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './auth.models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: emptyProps(),
    logout: emptyProps(),
    loginSuccess: props<{ user: User }>(),
    loginFailure: props<{ error: string }>(),
    rehydrateAuth: props<{ user: User }>(),
  },
});
