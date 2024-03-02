import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service/api.service';
import { OnboardingService } from '../stores/services/onboarding.services';
import { Store } from '@ngrx/store';
import { OnboardingState } from '../stores/models/hiring.state';
import { updateOnboardingSuccess } from '../stores/actions/onboarding-details.actions';
import { OnboardingDetailService } from '../stores/services/onboarding-detail.services';

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
  messageColor: string = 'black'; 


  constructor(
    private apiService: ApiService,
    // private onboardingService: OnboardingService,
    private onboardingDetailService: OnboardingDetailService,

    public dialogRef: MatDialogRef<RejectFeedbackDialogComponent>,
    private store: Store<{ onboarding: OnboardingState}>,

    @Inject(MAT_DIALOG_DATA) public data: { userAccountId: string, hrDecision: string }
  ) { }

  userAccountId!: string; 

  ngOnInit(): void {
    this.userAccountId = this.data.userAccountId; 
    this.apiPostGenTokenUrl = this.apiService.postGenerateRegiTokenUrl();
  }

  rejDecisionWtFeedback(): void {
    const rejFeedback = this.rejForm.get('rejFeedback')?.value || '';
    this.onboardingDetailService.updateOnboarding(this.userAccountId, { hrDecision: 'Rejected', rejFeedback }).subscribe({
      next: () => {
        console.log('Reject successfully');
        this.feedbackMessage = 'Rejection successful!';
        this.messageColor = 'green'; 
        this.rejForm.reset();
        this.store.dispatch(updateOnboardingSuccess({ userAccountId: this.userAccountId, onboardingStatus: 'Rejected', rejFeedback }));
      },
      error: (error) => {
        console.error('Error occurred during rejection:', error);
        const backendMessage = error.error?.message || 'Unknown error occurred. Please try again later.';
        this.feedbackMessage = `Error occurred during rejection: ${backendMessage}`;
        this.messageColor = 'red';
        this.rejForm.reset();
        this.store.dispatch(updateOnboardingFailure({ error: backendMessage }));
      }
    });
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }
  
}
function updateOnboardingFailure(arg0: { error: any; }): any {
  throw new Error('Function not implemented.');
}

