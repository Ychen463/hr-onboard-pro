import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { NewHousing } from '../../interfaces/housing.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create.housing.dialog',
  templateUrl: './create.housing.dialog.component.html',
  styleUrls: ['./create.housing.dialog.component.css'],
})
export class CreateHousingDialogComponent {
  newHousingForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateHousingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewHousing,
    private fb: FormBuilder
  ) {
    this.newHousingForm = this.fb.group({
      name: [data.name, [Validators.required]],
      address: [data.address, [Validators.required]],
      landlord: this.fb.group({
        fullName: [data.landlord.fullName, [Validators.required]],
        phoneNumber: [data.landlord.phoneNumber, [Validators.required]],
        email: [data.landlord.email, [Validators.required]]
      }),
      facilityInfo: this.fb.group({
        beds: [data.facilityInfo.beds, [Validators.required, Validators.min(0)]],
        mattresses: [data.facilityInfo.mattresses, [Validators.required, Validators.min(0)]],
        tables: [data.facilityInfo.tables, [Validators.required, Validators.min(0)]],
        chairs: [data.facilityInfo.chairs, [Validators.required, Validators.min(0)]],
      })
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.newHousingForm.valid) {
      // Set the 'data' property to the form values
      this.data = this.newHousingForm.getRawValue();

      // Close the dialog with the updated 'data'
      this.dialogRef.close(this.data);
    }
  }
}
