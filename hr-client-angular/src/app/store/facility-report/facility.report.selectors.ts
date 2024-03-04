import { createSelector, createFeatureSelector } from '@ngrx/store';
import { FacilityReportState } from './facility.report.models';

export const selectFacilityReportState = createFeatureSelector<FacilityReportState>('facilityReport');

export const selectFacilityReports = createSelector(
  selectFacilityReportState,
  (state: FacilityReportState) => state.FacilityReports
);