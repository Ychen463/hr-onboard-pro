import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OnboardingDetailService } from '../../services/onboarding-detail.services';
import { selectOnboardingByAccountId } from '../../../../store/hiring/selectors/hiring.selectors';
import { OnboardingState } from 'src/app/store/hiring/models/hiring.models'
import { Store, select } from '@ngrx/store';
import { updateOnboardingStart, updateOnboardingSuccess, updateOnboardingFail } from '../../../../store/hiring/actions/onboarding-details.actions';
import { Onboarding } from '../../../hiring-page/interfaces/onboarding.model';
import { Observable, map, of } from 'rxjs';


@Component({
  selector: 'app-reject-feedback-dialog',
  templateUrl: './reject-feedback-dialog.component.html',
  styleUrls: ['./reject-feedback-dialog.component.css']
})
export class RejectFeedbackDialogComponent implements OnInit {
  feedbackMessage: string = '';
  hrDecision!: string;
  rejForm!: FormGroup;
  messageColor: string = 'black'; 
  userAccountId!: string; 
  onboarding$: Observable<Onboarding | undefined>;


  constructor(
    private onboardingDetailService: OnboardingDetailService,
    private fb: FormBuilder,

    public dialogRef: MatDialogRef<RejectFeedbackDialogComponent>,
    private store: Store<{ onboarding: OnboardingState}>,

    @Inject(MAT_DIALOG_DATA) public data: { userAccountId: string, hrDecision: string }
  ) {     
    this.onboarding$ = of(undefined);
  }


  ngOnInit(): void {
    this.userAccountId = this.data.userAccountId;
    this.hrDecision = this.data.hrDecision;    
    this.onboarding$ = this.store.pipe(
      select(selectOnboardingByAccountId, { userAccountId:this.userAccountId})
    );
    
    this.rejForm = this.fb.group({ 
      rejFeedback: ['', Validators.required]
    });
    this.onboarding$.subscribe(data => {
      console.log('Onboarding data:', data);
    });
  }

  submitForm(): void {
    let rejFeedback = ''
    if (this.hrDecision === "Rejected"){
      rejFeedback = this.rejForm.get('rejFeedback')?.value || '';
    }
    
    if (this.hrDecision === "Rejected" && !rejFeedback.trim()) {
      alert('Please type in your feedback before submitting.');
      return; 
    }
      this.onboardingDetailService.updateOnboarding(this.userAccountId, 
      this.hrDecision, rejFeedback ).subscribe({
      next: () => {
        console.log(`${this.hrDecision} successfully`);
        this.feedbackMessage = `${this.hrDecision} successful!` ;
        if (this.hrDecision == "Approved") {
          this.messageColor = 'green';
        } else {
          this.messageColor = 'red';
        }
         
        this.rejForm.reset();
        this.store.dispatch(updateOnboardingSuccess({ userAccountId: this.userAccountId, onboardingStatus: this.hrDecision, rejFeedback }));

      },
      error: (error) => {
        console.error(`Error occurred during onboarding ${this.hrDecision}:`, error);
        const backendMessage = error.error?.message || 'Unknown error occurred. Please try again later.';
        this.feedbackMessage = `Error occurred during onboarding ${this.hrDecision}: ${backendMessage}`;
        this.messageColor = 'red';
        this.rejForm.reset();
        this.store.dispatch(updateOnboardingFailure({ error: backendMessage }));
      }
    });
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
function updateOnboardingFailure(arg0: { error: any; }): any {
  throw new Error('Function not implemented.');
}