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

@Component({
  selector: 'app-create.housing.dialog',
  templateUrl: './create.housing.dialog.component.html',
  styleUrls: ['./create.housing.dialog.component.css'],
})
export class CreateHousingDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateHousingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewHousing,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
