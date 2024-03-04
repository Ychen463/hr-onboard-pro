import { Component, OnInit, Input } from '@angular/core';
import { FacilityReport, NewComment } from '../../interfaces/facility.report.interfaces';
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
  @Input() userId: string | undefined;

  newCommentInit: NewComment = {
    facilityReportId: '',
    description: ''
  };
  newComment: NewComment = {
    facilityReportId: '',
    description: ''
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
    const dialogRef = this.dialog.open(AddCommentDialogComponent, {
      data: this.newComment, 
      height: '300px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.newComment = result;
        this.addComment();
      } else {
        this.newComment = this.newCommentInit;
      }
      console.log(this.newComment);
    });
  }

  addComment(): void {
    if (this.report) {
      this.facilityReportService.addComment({ ...this.newComment, facilityReportId: this.report._id });
    }
  }

  // openEditCommentDialog(): void {
  //   const dialogRef = this.dialog.open(EditCommentDialogComponent, {
  //     data: this.newComment, 
  //     height: '400px',
  //     width: '600px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if (result) {
  //       this.newComment = result;
  //       this.editComment();
  //     } else {
  //       this.newComment = this.newCommentInit;
  //     }
  //     console.log(this.newComment);
  //   });
  // }

  // editComment(): void {
  //   if (this.report) {
  //     this.facilityReportService.addComment({ ...this.newComment, facilityReportId: this.report._id });
  //   }
  // }
}
