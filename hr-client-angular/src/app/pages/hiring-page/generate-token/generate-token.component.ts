import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service/api.service';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {
  apiPostGenTokenUrl!: string;
  tokenForm = new FormGroup({
    userFirstName: new FormControl(''),
    userLastName: new FormControl(''),
    email: new FormControl('')
  });

  tokenFeedbackMessage: string = '';

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<GenerateTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.apiPostGenTokenUrl = this.apiService.postGenerateRegiTokenUrl();
  }

  createNewRegistrationToken(): void {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.error('JWT token not found');
      return;
    }
    const headers = { 'Authorization': `Bearer ${jwtToken}` };

    const newRegistrationToken = this.tokenForm.value;

    this.httpClient.post(this.apiPostGenTokenUrl, newRegistrationToken, { headers }).subscribe(
      (response: any) => {
        console.log('API response:', response);
        this.tokenFeedbackMessage = 'Token generated successfully.';
      },
      (error) => {
        console.error('API error:', error);
        if (error.status === 401) {
          this.tokenFeedbackMessage = 'Unauthorized: Please log in to generate a token.';
        } else if (error.status === 403) {
          this.tokenFeedbackMessage = 'Forbidden: You do not have permission to generate a token.';
        } else {
          this.tokenFeedbackMessage = 'Failed to generate token. Please try again later.';
        }
      }
    );
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
