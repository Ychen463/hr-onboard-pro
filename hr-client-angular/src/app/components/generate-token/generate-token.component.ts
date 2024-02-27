import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent {
  userFirstName: string = '';
  userLastName: string = '';
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  registrationLink: string = '';
  responseMessage: string = ''; 
  returnedFirstName: string = ''; 
  returnedLastName: string = ''; 

  constructor(private http: HttpClient) {}

  generateToken(): void {
    const data = {
      userFirstName: this.userFirstName,
      userLastName: this.userLastName,
      email: this.email
    };

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('JWT token not found in localStorage.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post<any>('http://localhost:3000/api/registrationToken', data, { headers }).pipe(
      catchError((error) => {
        if (error.status === 409) {
          this.errorMessage = 'Email already exists. Please use a different email.';
        } else {
          this.errorMessage = 'Failed to generate token. Please try again later.';
        }
        return throwError(error);
      })
    ).subscribe(
      response => {
        console.log('Token generated successfully:', response);
        this.errorMessage = '';
        this.successMessage = 'Token generated successfully.';
        this.responseMessage = response.message;
        this.registrationLink = response.registrationLink;
        this.returnedFirstName = response.userFirstName;
        this.returnedLastName = response.userLastName;
        this.clearForm();
      },
      error => {
        console.error('Failed to generate token:', error);
      }
    );
  }

  clearForm(): void {
    this.userFirstName = '';
    this.userLastName = '';
    this.email = '';
  }
}
