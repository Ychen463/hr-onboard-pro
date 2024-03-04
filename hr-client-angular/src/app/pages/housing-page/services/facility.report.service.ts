import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { facilityReportForHouseActions, addCommentActions, editCommentActions } from 'src/app/store/facility-report/facility.report.actions';
import { FacilityReportsResponse, NewComment, CommentToBeUpdated, CommentResponse } from '../interfaces/facility.report.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FacilityReportService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  getFacilityReportsByHouseId(housingId: string): void {
    this.store.dispatch(facilityReportForHouseActions.getreports());
    this.http.post<FacilityReportsResponse>('api/facilityReports/house', { housingId }).subscribe({
      next: (response) => {
        if (response.reportList) {
          this.store.dispatch(
            facilityReportForHouseActions.getreportssuccess({ reportList: response.reportList })
          );
        } else {
          this.store.dispatch(
            facilityReportForHouseActions.getreportsfail({ error: 'No reports field found in HTTP response.' })
          );
        }
      },
      error: (error) => {
        this.store.dispatch(facilityReportForHouseActions.getreportsfail(error));
      },
    });
  }

  addComment(newComment: NewComment): void {
    this.store.dispatch(addCommentActions.addcomment());
    this.http.post<CommentResponse>('api/facilityReport/comment', newComment).subscribe({
      next: (response) => {
        if (response.updatedReport) {
          this.store.dispatch(
            addCommentActions.addcommentsuccess({ updatedReport: response.updatedReport })
          );
        } else {
          this.store.dispatch(
            addCommentActions.addcommentfail({ error: 'No updatedReport field found in HTTP response.' })
          );
        }
      },
      error: (error) => {
        this.store.dispatch(addCommentActions.addcommentfail(error));
      },
    });
  }

  editComment(commentToBeUpdated: CommentToBeUpdated): void {
    this.store.dispatch(editCommentActions.editcomment());
    this.http.patch<CommentResponse>('api/facilityReport/comment', commentToBeUpdated).subscribe({
      next: (response) => {
        if (response.updatedReport) {
          this.store.dispatch(
            editCommentActions.editcommentsuccess({ updatedReport: response.updatedReport })
          );
        } else {
          this.store.dispatch(
            editCommentActions.editcommentfail({ error: 'No updatedReport field found in HTTP response.' })
          );
        }
      },
      error: (error) => {
        this.store.dispatch(editCommentActions.editcommentfail(error));
      },
    });
  }
}
