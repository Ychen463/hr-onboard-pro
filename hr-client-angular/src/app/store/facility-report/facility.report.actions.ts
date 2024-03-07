import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FacilityReport } from 'src/app/pages/housing-page/interfaces/facility.report.interfaces';

export const facilityReportForHouseActions = createActionGroup({
  source: 'facilityReport',
  events: {
    getReports: emptyProps(),
    getReportsSuccess: props<{ reportList: Array<FacilityReport> }>(),
    getReportsFail: props<{ error: string }>(),
  },
});

export const addCommentActions = createActionGroup({
  source: 'facilityReport',
  events: {
    addComment: emptyProps(),
    addCommentSuccess:props<{ updatedReport: FacilityReport }>(),
    addCommentFail: props<{ error: string }>(),
  },
});

export const editCommentActions = createActionGroup({
  source: 'facilityReport',
  events: {
    editComment: emptyProps(),
    editCommentSuccess:props<{ updatedReport: FacilityReport }>(),
    editCommentFail: props<{ error: string }>(),
  },
});