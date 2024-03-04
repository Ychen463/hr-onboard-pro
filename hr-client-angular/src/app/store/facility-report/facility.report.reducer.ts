import { createReducer, on } from "@ngrx/store";
import { FacilityReportState } from "./facility.report.models";
import { facilityReportForHouseActions, addCommentActions, editCommentActions } from "./facility.report.actions";
import { produce } from 'immer';

const initialState: FacilityReportState = {
  isLoading: false,
  error: null,
  FacilityReports: null,
}

export const facilityReportReducer = createReducer(
  initialState,

  on(facilityReportForHouseActions.getreports, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  on(facilityReportForHouseActions.getreportssuccess, (state, { reportList }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.FacilityReports = reportList;
    })
  ),

  on(facilityReportForHouseActions.getreportsfail, (state, { error }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = error;
    })
  ),

  on(addCommentActions.addcomment, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  on(addCommentActions.addcommentsuccess, (state, { updatedReport }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.FacilityReports = state.FacilityReports? // if FacilityReports exists
        (state.FacilityReports.find((report) => report._id == updatedReport._id)? // if the same report exists
          state.FacilityReports.map((report) => {
            if(report._id == updatedReport._id){
              return updatedReport;
            }else{
              return report;
            }
          }):[...state.FacilityReports, updatedReport])
        : [ updatedReport ];
    })
  ),

  on(addCommentActions.addcommentfail, (state, { error }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = error;
    })
  ),

  on(editCommentActions.editcomment, (state) =>
    produce(state, (draft) => {
      draft.isLoading = true;
      draft.error = null;
    })
  ),

  on(editCommentActions.editcommentsuccess, (state, { updatedReport }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.FacilityReports = state.FacilityReports? // if FacilityReports exists
        (state.FacilityReports.find((report) => report._id == updatedReport._id)? // if the same report exists
          state.FacilityReports.map((report) => {
            if(report._id == updatedReport._id){
              return updatedReport;
            }else{
              return report;
            }
          }):[...state.FacilityReports, updatedReport])
        : [ updatedReport ];
    })
  ),

  on(editCommentActions.editcommentfail, (state, { error }) =>
    produce(state, (draft) => {
      draft.isLoading = false;
      draft.error = error;
    })
  ),
)