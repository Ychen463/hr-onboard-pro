import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service/api.service';
@Component({
  selector: 'app-reject-feedback-dialog',
  templateUrl: './reject-feedback-dialog.component.html',
  styleUrls: ['./reject-feedback-dialog.component.css']
})
export class RejectFeedbackDialogComponent implements OnInit {
  apiPostGenTokenUrl!: string;
  feedbackMessage: string = '';
  rejForm = new FormGroup({
    rejFeedback: new FormControl('')
  });

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<RejectFeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userAccountId: string }
  ) { }

  userAccountId!: string; 

  ngOnInit(): void {
    this.userAccountId = this.data.userAccountId; 
    this.apiPostGenTokenUrl = this.apiService.postGenerateRegiTokenUrl();
  }

  rejDecisionWtFeedback(): void {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.error('JWT token not found');
      return;
    }
    const headers = { 'Authorization': `Bearer ${jwtToken}` };

    const rejFeedback = this.rejForm.get('rejFeedback')?.value;

    const apiPatchDecisionbUrl = this.apiService.getOnboardingDecisionUrl(this.userAccountId); 
    this.httpClient.patch(apiPatchDecisionbUrl, { hrDecision: 'Rejected', rejFeedback: rejFeedback }, {headers}).subscribe(
      (data) => {
        console.log('Reject successfully:', data);
        this.feedbackMessage = `Rejection successful! with Feedback: ${rejFeedback}`;
        this.rejForm.reset(); 
        // this.dialogRef.close();

      },
      (error) => {
        console.error('Error occurred during rejection:', error);
        this.feedbackMessage = 'Error occurred during rejection: ' + error.message;
        this.rejForm.reset(); 
      }
    );

    
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
