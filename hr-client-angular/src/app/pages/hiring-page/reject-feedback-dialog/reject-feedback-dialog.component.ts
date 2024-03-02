import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service/api.service';
import { OnboardingService } from '../stores/services/onboarding.services';

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
    private apiService: ApiService,
    private onboardingService: OnboardingService,
    public dialogRef: MatDialogRef<RejectFeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userAccountId: string, hrDecision: string }
  ) { }

  userAccountId!: string; 

  ngOnInit(): void {
    this.userAccountId = this.data.userAccountId; 
    this.apiPostGenTokenUrl = this.apiService.postGenerateRegiTokenUrl();
  }

  
  rejDecisionWtFeedback(): void {
    const rejFeedback = this.rejForm.get('rejFeedback')?.value || '';;
      this.onboardingService.updateOnboarding(this.userAccountId, { hrDecision: 'Rejected', rejFeedback }).subscribe(
      () => {
        console.log('Reject successfully');
        this.feedbackMessage = 'Rejection successful!';
        this.rejForm.reset();
      },
      error => {
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
