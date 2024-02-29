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
export class GenerateTokenComponent implements OnInit{
  apiPostGenTokenUrl!: string;
  tokenForm = new FormGroup({
    userFirstName: new FormControl(''),
    userLastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<GenerateTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {

    this.apiPostGenTokenUrl = this.apiService.postGenerateRegiTokenUrl();
  }

    /** Creates and returns a new RegistrationTokenData. */
    createNewRegistrationToken(): void {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        console.error('JWT token not found');
        return;
      }
      const headers = { 'Authorization': `Bearer ${jwtToken}` };

      const newRegistrationToken = this.tokenForm.value;
  
      this.httpClient.post(this.apiPostGenTokenUrl, newRegistrationToken, { headers }).subscribe((response) => {
        console.log('API response:', response);

      this.dialogRef.close();
    }, error => {
      console.error('API error:', error);
    });
    }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
