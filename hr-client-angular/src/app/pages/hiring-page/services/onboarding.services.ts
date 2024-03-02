import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Onboarding } from '../interfaces/onboarding.model';
// import { ApiService } from 'src/app/services/hiring.service/api.service';
import { ApiService } from '../services/api.service';


@Injectable({
    providedIn: 'root'
  })
  export class OnboardingService {
    private dataUpdated = new Subject<void>();
    dataUpdated$ = this.dataUpdated.asObservable();

    constructor(
        private httpClient: HttpClient,
        private apiService: ApiService,
        ) {}

    getOnboardings(): Observable<Onboarding[]> {
        return this.httpClient.get<Onboarding[]>(this.apiService.getAllOnboardingUrl())
            .pipe(
            catchError(error => {
                return throwError(error);
            })
            );
        }

    updateOnboarding(userAccountId: string, data: { hrDecision: string; rejFeedback?: string }): Observable<any> {
        const apiPatchDecisionUrl = this.apiService.getOnboardingDecisionUrl(userAccountId);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.httpClient.patch(apiPatchDecisionUrl, data, { headers })
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