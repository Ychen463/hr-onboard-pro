import { Component, OnInit, Input } from '@angular/core';
import { CommentToBeUpdated, FacilityReport, NewComment } from '../../interfaces/facility.report.interfaces';
import { FacilityReportService } from '../../services/facility.report.service';
import { Store } from '@ngrx/store';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../add.comment.dialog/add.comment.dialog.component';
import { EditCommentDialogComponent } from '../edit.comment.dialog/edit.comment.dialog.component';

@Component({
  selector: 'app-facility-report-card',
  templateUrl: './facility.report.card.component.html',
  styleUrls: ['./facility.report.card.component.css']
})
export class FacilityReportCardComponent implements OnInit {
  @Input() report: FacilityReport | undefined;
  @Input() userAccountId: string | undefined;

  newCommentInit: NewComment = {
    facilityReportId: '',
    description: ''
  };
  newComment: NewComment = {
    facilityReportId: '',
    description: ''
  }
  commentEditing: CommentToBeUpdated = {
    facilityReportId: '',
    commentId: '',
    description: '',
  }

  isCollapsed: boolean = false;

  constructor(
    private store: Store,
    private facilityReportService: FacilityReportService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }

  toggleCardCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  openAddCommentDialog(): void {
    // console.log(this.newComment.description);
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      data: this.newComment, 
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log('Result: ' + result);
      if (result) {
        this.newComment = result;
        this.addComment();
      } else {
        this.newComment = this.newCommentInit;
      }
      // console.log(this.newComment);
    });
  }

  addComment(): void {
    if (this.report) {
      this.facilityReportService.addComment({ ...this.newComment, facilityReportId: this.report._id });
      // console.log({ ...this.newComment, facilityReportId: this.report._id })
    }
  }

  openEditCommentDialog(commentId: string, description: string): void {
    this.commentEditing.commentId = commentId;
    this.commentEditing.description = description;
    
    const dialogRef = this.dialog.open(EditCommentDialogComponent, {
      data: this.commentEditing, 
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.commentEditing = result;
        this.editComment();
      } else {
        this.commentEditing.commentId = '';
        this.commentEditing.description = '';
      }
      console.log(this.newComment);
    });
  }

  editComment(): void {
    if (this.report) {
      this.facilityReportService.editComment({ ...this.commentEditing, facilityReportId: this.report._id });
    }
  }
}
