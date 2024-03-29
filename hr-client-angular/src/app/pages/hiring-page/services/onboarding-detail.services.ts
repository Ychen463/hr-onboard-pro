import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Onboarding } from '../../hiring-page/interfaces/onboarding.model';
import { ApiService } from '../../hiring-page/services/api.service';


@Injectable({
    providedIn: 'root'
  })
  export class OnboardingDetailService {
    private dataUpdated = new Subject<void>();
    getDataUpdatedObservable() {
        return this.dataUpdated.asObservable();
      }
    constructor(
        private httpClient: HttpClient,
        private apiService: ApiService,
        ) {}

    getOnboardings(userAccountId: string): Observable<Onboarding[]> {
        return this.httpClient.get<Onboarding[]>(this.apiService.getOneOnboardingUrl(userAccountId))
            .pipe(
            catchError(error => {
                return throwError(error);
            }),
            tap(() => {
                this.dataUpdated.next(); 
              })
            );
        }

        updateOnboarding(userAccountId: string,  hrDecision: string, rejFeedback?: string ): Observable<any> {
            const apiPatchDecisionUrl = this.apiService.getOnboardingDecisionUrl(userAccountId);
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
            });
            return this.httpClient.patch(apiPatchDecisionUrl, {hrDecision,rejFeedback}, { headers })
                .pipe(
                catchError(error => {
                    return throwError(error);
                }),
                tap(() => {
                    this.dataUpdated.next();
                  })
                );
            }
      }