import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ObjectId } from 'mongodb';
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
  userAccountIdForDetails: ObjectId | null = null;

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
        this.store.dispatch(profileActions.addsummariesfail(error));
      },
    });
  }

  getProfileById(userAccountId: ObjectId): Observable<FullProfileResponse> {
    const body = {
      userAccountId,
    };
    return this.http.post<FullProfileResponse>('api/employee/profile', body);
  }
}
