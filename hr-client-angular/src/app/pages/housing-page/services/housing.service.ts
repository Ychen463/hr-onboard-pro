import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { HousingSummaryResponse, HousingProfileResponse, CreateHousingResponse, NewHousing } from '../interfaces/housing.interfaces';
import { housingSummaryActions, housingFullInfoActions, createHousingActions } from 'src/app/store/housing/housing.actions';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getHousingSummary(): void {
    this.store.dispatch(housingSummaryActions.addsummaries());
    this.http.get<HousingSummaryResponse>('api/housing/summary').subscribe({
      next: (response) => {
        if (response.houseList) {
          this.store.dispatch(
            housingSummaryActions.addsummariessuccess({ houseList: response.houseList })
          );
        } else {
          this.store.dispatch(
            housingSummaryActions.addsummariesfail({ error: 'No housing summary found in HTTP response.' })
          );
        }
      },
      error: (error) => {
        // Extracting and dispatching the error message
        const errorMessage = error.error instanceof ErrorEvent
          ? `Client-side error: ${error.error.message}`
          : `Server-side error: ${error.status} - ${error.error.message}`;

        this.store.dispatch(housingSummaryActions.addsummariesfail({ error: errorMessage }));
      },
    });
  }

  getProfileById(housingId: string): void {
    this.store.dispatch(housingFullInfoActions.getfullinfo());
    this.http.get<HousingProfileResponse>(`api/housing/${housingId}`).subscribe({
      next: (response) => {
        if (response.house) {
          this.store.dispatch(
            housingFullInfoActions.getfullinfosuccess({ house: response.house })
          );
        } else {
          this.store.dispatch(
            housingFullInfoActions.getfullinfofail({ error: 'No housing info found in HTTP response.' })
          );
        }
      },
      error: (error) => {
        // Extracting and dispatching the error message
        const errorMessage = error.error instanceof ErrorEvent
          ? `Client-side error: ${error.error.message}`
          : `Server-side error: ${error.status} - ${error.error.message}`;

        this.store.dispatch(housingFullInfoActions.getfullinfofail({ error: errorMessage }));
      },
    });
  }

  createHousing(newHousing: NewHousing): void {
    this.store.dispatch(createHousingActions.createhousing());
    this.http.post<CreateHousingResponse>('api/housing', newHousing).subscribe({
      next: (response) => {
        if (response.houseCreated) {
          this.store.dispatch(
            createHousingActions.createhousingsuccess({ houseCreated: response.houseCreated })
          );
        } else {
          this.store.dispatch(
            createHousingActions.createhousingfail({ error: 'No new housing info found in HTTP response.' })
          );
        }
      },
      error: (error) => {
        const errorMessage = error.error instanceof ErrorEvent
          ? `Client-side error: ${error.error.message}`
          : `Server-side error: ${error.status} - ${error.error.message}`;

        this.store.dispatch(createHousingActions.createhousingfail({ error: errorMessage }));
      },
    });
  }
}
