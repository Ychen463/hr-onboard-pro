import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Visa } from '../../visa-page/interfaces/visa.model';
import { getVisas, getVisasSuccess, getVisasFail, selectVisaByUserAccountId,updateHRDecision } from 'src/app/store/visa/visa.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class VisaService {
  userAccountIdForDetails: string | null = null;

  constructor(private http: HttpClient,
    private store: Store
    ) { }

    getAllVisas(): Observable<Visa[]> {
        const APIgetAll = 'api/visa/allwithOb'; 
        return this.http.get<Visa[]>(APIgetAll).pipe(
          tap((response: Visa[]) => {
            if (response && response.length > 0) {
              this.store.dispatch(getVisasSuccess({ visas: response }));
            } else {
              this.store.dispatch(getVisasFail({ error: 'No profile found in HTTP response.' }));
            }
          }),
          catchError(this.handleError)
        );
      }  
  
  
      getVisaByUserAccountId(userAccountId: string): Observable<Visa> {
        const APIgetById = `api/visa/${userAccountId}/summary`; 
        return this.http.get<Visa>(APIgetById).pipe(
          tap((response: Visa) => {
          }),
          catchError((error) => {
            throw error;
          })
        );
      }
    
      updateHRDecision(userAccountId: string, documentType: string, decision: string, rejFeedback?: string): Observable<Visa> {
        const payload = { decision, rejFeedback };
        const APIupdateDecision = `api/visa/${userAccountId}/${documentType}/decision`;
    
        return this.http.patch<Visa>(APIupdateDecision, payload).pipe(
          catchError((error) => {
            throw error;
          })
        );
      }

      
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}