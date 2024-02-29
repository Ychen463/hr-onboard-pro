// api.service.ts
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
// REGISTRATION
    // getAllTokens
  private APIgetAllRegiToken: string = `api/registrationToken`;
  private APIpostGenerateRegiToken: string = `api/registrationToken`;


  constructor() { }

  getAllRegiTokenUrl(): string {
    return this.APIgetAllRegiToken;
  }
  postGenerateRegiTokenUrl(): string {
    return this.APIpostGenerateRegiToken;
  }
}
