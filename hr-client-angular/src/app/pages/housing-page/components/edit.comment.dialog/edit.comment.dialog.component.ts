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

@Component({
  selector: 'app-edit.comment.dialog',
  templateUrl: './edit.comment.dialog.component.html',
  styleUrls: ['./edit.comment.dialog.component.css']
})
export class EditCommentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentToBeUpdated,
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
