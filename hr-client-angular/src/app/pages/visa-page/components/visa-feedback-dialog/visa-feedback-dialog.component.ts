import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';

import { Visa, VisaDocument } from '../../interfaces/visa.model';
import { VisaService } from '../../services/visa.service';
import { VisaState } from 'src/app/store/visa/visa.models';
import { selectVisaByUserAccountId } from 'src/app/store/visa/visa.selectors';
import { updateHRDecision,updateHRDecisionFailure } from 'src/app/store/visa/visa.actions';


@Component({
  selector: 'app-visa-feedback-dialog',
  templateUrl: './visa-feedback-dialog.component.html',
  styleUrls: ['./visa-feedback-dialog.component.css']
})
export class VisaFeedbackDialogComponent implements OnInit {
  feedbackMessage: string = '';
  rejForm!: FormGroup;
  messageColor: string = 'black'; 
  userAccountId!: string; 
  lastDocKey!: string;
  onboarding$!: Observable<Visa | undefined>;
  visa$: Observable<Visa | undefined>;
  hrDecision!: string;

  constructor(
    private visaService: VisaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VisaFeedbackDialogComponent>,
    private store: Store<{ visa: VisaState}>,

    @Inject(MAT_DIALOG_DATA) public data: { userAccountId: string, lastDocKey: string, hrDecision: string }
  ) { 
    this.visa$ = of(undefined);
  }
  ngOnInit(): void {
    this.userAccountId = this.data.userAccountId;    
    this.lastDocKey = this.data.lastDocKey;    
    this.hrDecision = this.data.hrDecision;    

    this.visa$ = this.store.pipe(
      select(selectVisaByUserAccountId, { userAccountId: this.userAccountId })
    );
    this.rejForm = this.fb.group({ 
      rejFeedback: ['', Validators.required]
    });
  }
    
  
  submitForm(): void {
    
    const rejFeedback = this.rejForm.get('rejFeedback')?.value || '';
    if (!rejFeedback.trim()) {
      alert('Please type in your feedback before submitting.');
      return; 
    }
    this.visaService.updateHRDecision(this.userAccountId, 
                                      this.lastDocKey, 
                                      this.hrDecision, 
                                      rejFeedback
    ).subscribe({
      next: () => {
        console.log('Reject successfully');
        this.feedbackMessage = 'Rejection successful!';
        this.messageColor = 'green'; 
        this.rejForm.reset();
                this.store.dispatch(updateHRDecision({ 
          userAccountId: this.userAccountId, 
          documentType: this.lastDocKey, 
          hrDecision: this.hrDecision, 
          rejFeedback: rejFeedback 
        }));
      },
      error: (error) => {
        console.error('Error occurred during rejection:', error);
        const backendMessage = error.error?.message || 'Unknown error occurred. Please try again later.';
        this.feedbackMessage = `Error occurred during rejection: ${backendMessage}`;
        this.messageColor = 'red';
        this.rejForm.reset();
                this.store.dispatch(updateHRDecisionFailure({ error: backendMessage }));
      }
    });
  }

  confirmAction(): void {
    const rejFeedback = '';
    this.visaService.updateHRDecision(this.userAccountId, 
                                      this.lastDocKey, 
                                      this.hrDecision, 
                                      rejFeedback
    ).subscribe({
      next: () => {
        console.log('Confirm successfully');
        this.feedbackMessage = 'Confirm successful!';
        this.messageColor = 'green'; 
        this.rejForm.reset();
                this.store.dispatch(updateHRDecision({ 
          userAccountId: this.userAccountId, 
          documentType: this.lastDocKey, 
          hrDecision: this.hrDecision, 
          rejFeedback: rejFeedback 
        }));
      },
      error: (error) => {
        console.error('Error occurred during rejection:', error);
        const backendMessage = error.error?.message || 'Unknown error occurred. Please try again later.';
        this.feedbackMessage = `Error occurred during rejection: ${backendMessage}`;
        this.messageColor = 'red';
        this.rejForm.reset();
                this.store.dispatch(updateHRDecisionFailure({ error: backendMessage }));
      }
    });
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getDocumentKeys(docs: { [key: string]: VisaDocument }): string[] {
    return Object.keys(docs);
  }

}