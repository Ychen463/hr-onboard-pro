import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { RegistrationTokenService } from '../../services/registrationToken.services';
import { RegistrationTokenActions } from '../../../../store/hiring/actions/registrationToken.actions';
import { HiringState } from '../../../../store/hiring/models/hiring.models'
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
  operationSuccess: boolean | null = null; // true for success, false for failure, null for no operation yet
  tokenFeedbackMessage: string = '';

  constructor(
    private store: Store<HiringState>,
    private registrationTokenService: RegistrationTokenService,
    public dialogRef: MatDialogRef<GenerateTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    
  }

  createNewRegistrationToken(): void {

    const newRegistrationToken = this.tokenForm.value;
    this.registrationTokenService.generateToken(newRegistrationToken).subscribe({
      next: (response) => {
        this.store.dispatch(RegistrationTokenActions.generateregistrationtokensuccess({ input: response }));
        console.log('Token generated successfully:', response);
        this.tokenFeedbackMessage = 'Token generated successfully.';
        this.operationSuccess = true;
      },
      error: (error) => {
        this.store.dispatch(RegistrationTokenActions.generateregistrationtokenfailure({ error }));
        console.error('Failed to generate token:', error);
        this.operationSuccess = false;
        this.tokenFeedbackMessage = error;
      }
    });
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
