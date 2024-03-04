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
import { NewComment } from '../../interfaces/facility.report.interfaces';

@Component({
  selector: 'app-add.comment.dialog',
  templateUrl: './add.comment.dialog.component.html',
  styleUrls: ['./add.comment.dialog.component.css']
})
export class AddCommentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewComment,
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
