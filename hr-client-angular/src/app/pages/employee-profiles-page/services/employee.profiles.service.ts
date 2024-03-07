import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import {
  FullProfileResponse,
  ProfileSummaryResponse,
} from '../interfaces/employee.profile.interfaces';
import { Store } from '@ngrx/store';
import { profileActions } from '../../../store/employee-profile/employee.profile.actions';

@Injectable({
  providedIn: 'root',
})

export class EmployeeProfilesService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getProfileSummary(): void {
    this.store.dispatch(profileActions.addsummaries());
    this.http.get<ProfileSummaryResponse>('api/employee/profiles').subscribe({
      next: (response) => {
        if (response.profileList) {
          this.store.dispatch(
            profileActions.addsummariessuccess({ profileList: response.profileList })
          );
        } else {
          this.store.dispatch(
            profileActions.addsummariesfail({ error: 'No profile found in HTTP response.' })
          );
        }
      },
      error: (error) => {
        // Extracting and dispatching the error message
        const errorMessage = error.error instanceof ErrorEvent
          ? `Client-side error: ${error.error.message}`
          : `Server-side error: ${error.status} - ${error.error.message}`;

        this.store.dispatch(profileActions.addsummariesfail({ error: errorMessage }));
      },
    });
  }

  getProfileById(userAccountId: string): Observable<FullProfileResponse> {
    const body = {
      userAccountId,
    };
    return this.http.post<FullProfileResponse>('api/employee/profile', body);
  }
}
