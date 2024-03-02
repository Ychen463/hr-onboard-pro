import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { RegistrationToken, DisplayedRegistrationToken } from '../../hiring-page/interfaces/registrationToken.model';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
  })
export class RegistrationTokenService {
    private dataUpdated = new Subject<void>();
    dataUpdated$ = this.dataUpdated.asObservable();

    private APIgetAllRegistrationToken: string = `api/registrationToken`;

    constructor(
      private httpClient: HttpClient,
      private apiService: ApiService,
      ) {}
    getJwtToken(): string | null {
        return localStorage.getItem('jwtToken');
      }

      generateToken(newRegistrationToken: any): Observable<any> {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getJwtToken()}`
        });
        return this.httpClient.post(this.apiService.getAllRegiTokenUrl(), newRegistrationToken, { headers }).pipe(
          tap(() => {
            this.dataUpdated.next();
          }),
          catchError(this.handleError)
        );
      }
        
      private handleError(error: any): Observable<never> {
        let errorMessage = 'Failed to generate token. Please try again later.';
        if (error.status === 401) {
          errorMessage = 'Unauthorized: Please log in to generate a token.';
        } else if (error.status === 403) {
          errorMessage = 'Forbidden: You do not have permission to generate a token.';
        }
        console.error('API error:', error);
        return throwError(errorMessage);
      }

      getAllTokens(): Observable<DisplayedRegistrationToken[]> {
        return this.httpClient.get<RegistrationToken[]>(this.APIgetAllRegistrationToken).pipe(
          map(data => data.map(item => ({
              name: `${item.userFirstName} ${item.userLastName}`,
              email: item.email,
              registrationLink: item.registrationLink,
              tokenStatus: item.tokenStatus,
              createdDatetime: item.createdDatetime
          }))),
          catchError(this.handleError)
        )
      }
    }

