import { Inject, Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommentToBeUpdated } from '../../interfaces/facility.report.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit.comment.dialog',
  templateUrl: './edit.comment.dialog.component.html',
  styleUrls: ['./edit.comment.dialog.component.css']
})
export class EditCommentDialogComponent {
  commentForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentToBeUpdated,
    private fb: FormBuilder
  ) { 
    this.commentForm = this.fb.group({
      description: [data.description, [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
