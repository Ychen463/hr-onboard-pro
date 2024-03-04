import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HousingService } from '../../services/housing.service';
import { HousingSummary, NewHousing } from '../../interfaces/housing.interfaces';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { selectHousingSummaries } from 'src/app/store/housing/housing.selectors';
import { CreateHousingDialogComponent } from '../create.housing.dialog/create.housing.dialog.component';

@Component({
  selector: 'app-housing-summary-view',
  templateUrl: './housing.summary.view.component.html',
  styleUrls: ['./housing.summary.view.component.css']
})
export class HousingSummaryViewComponent implements OnInit, OnDestroy {
  newHousingInit: NewHousing = {
    name: '',
    address: '',
    landlord: {
      fullName: '',
      phoneNumber: '',
      email: '',
    },
    facilityInfo: {
      beds: 0,
      mattresses: 0,
      tables: 0,
      chairs: 0,
    }
  };
  newHousing: NewHousing = {
    name: '',
    address: '',
    landlord: {
      fullName: '',
      phoneNumber: '',
      email: '',
    },
    facilityInfo: {
      beds: 0,
      mattresses: 0,
      tables: 0,
      chairs: 0,
    }
  }
  pageIndex: number = 0;
  pageSize: number = 4;

  dataSource = new MatTableDataSource<HousingSummary>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectHousingSummariesSubscription: Subscription | undefined;

  constructor(
    private houseService: HousingService, 
    private router: Router,
    private store: Store,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.houseService.getHousingSummary();

    this.selectHousingSummariesSubscription = this.store
      .select(selectHousingSummaries)
      .subscribe((summaries) => {
        if (summaries) {
          this.dataSource.data = summaries;
        }
        this.dataSource.paginator = this.paginator;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.selectHousingSummariesSubscription?.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateHousingDialogComponent, {
      data: this.newHousing, 
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.newHousing = result;
        this.createNewHousing();
      } else {
        this.newHousing = this.newHousingInit;
      }
      console.log(this.newHousing);
    });
  }

  createNewHousing(): void {
    this.houseService.createHousing(this.newHousing);
  }

  navigateToDetails(housingId: string) {
    this.router.navigate(['housing/housing-details', housingId]);
  }
}
