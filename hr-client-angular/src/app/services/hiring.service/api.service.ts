// api.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
// REGISTRATION
    // getAllTokens
  private APIgetAllRegiToken: string = `api/registrationToken`;
  private APIpostGenerateRegiToken: string = `api/registrationToken`;
  private APIgetAllOnboarding: string = `api/onboardings`;
  

  constructor() { }

  getAllRegiTokenUrl(): string {
    return this.APIgetAllRegiToken;
  }
  postGenerateRegiTokenUrl(): string {
    return this.APIpostGenerateRegiToken;
  }
  getAllOnboardingUrl(): string {
    return this.APIgetAllOnboarding;
  }
  getOneOnboardingUrl(userAccountId: string): string {
    return `api/onboarding/${userAccountId}`;
  }
  getOnboardingDecisionUrl(userAccountId: string): string {
    return `api/onboarding/${userAccountId}/status`;
  }
}
