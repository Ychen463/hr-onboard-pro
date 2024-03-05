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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add.comment.dialog',
  templateUrl: './add.comment.dialog.component.html',
  styleUrls: ['./add.comment.dialog.component.css']
})
export class AddCommentDialogComponent {
  commentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewComment,
    private fb: FormBuilder
  ) { 
    this.commentForm = this.fb.group({
      description: [data.description, [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      // Set the 'data' property to the form values
      this.data = {
        ...this.data,
        description: this.commentForm.get('description')?.value,
      };

      // Close the dialog with the updated 'data'
      this.dialogRef.close(this.data);
    }
  }
}
