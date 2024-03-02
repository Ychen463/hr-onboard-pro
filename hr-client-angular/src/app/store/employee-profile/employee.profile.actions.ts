import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProfileSummary } from 'src/app/pages/employee-profiles-page/interfaces/employee.profile.interfaces';

export const profileActions = createActionGroup({
  source: 'ProfileSummary',
  events: {
    addSummaries: emptyProps(),
    addSummariesSuccess: props<{ profileList: Array<ProfileSummary> }>(),
    addSummariesFail: props<{ error: string }>(),
  },
});
