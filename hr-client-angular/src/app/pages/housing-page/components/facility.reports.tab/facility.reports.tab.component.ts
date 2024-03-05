import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FacilityReportService } from '../../services/facility.report.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { selectFacilityReports } from 'src/app/store/facility-report/facility.report.selectors';
import { FacilityReport } from '../../interfaces/facility.report.interfaces';
import { selectCurrentUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-facility-reports-tab',
  templateUrl: './facility.reports.tab.component.html',
  styleUrls: ['./facility.reports.tab.component.css']
})
export class FacilityReportsTabComponent implements OnInit, OnDestroy {
  housingId: string | null = null;
  userAccountId: string | undefined;
  selectFacilityReportsSubscription: Subscription | undefined;
  selectUserSubsciption: Subscription | undefined;
  pageIndex: number = 0;
  pageSize: number = 4;

  dataSource = new MatTableDataSource<FacilityReport>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private facilityReportService: FacilityReportService,
    private store: Store,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.housingId = this.route.snapshot.paramMap.get('housingId');

    if (this.housingId) {
      this.facilityReportService.getFacilityReportsByHouseId(this.housingId);

      this.selectFacilityReportsSubscription = this.store
        .select(selectFacilityReports)
        .subscribe((reports) => {
          if(reports){
            this.dataSource.data = reports;
            // console.log(reports);
          }
          this.dataSource.paginator = this.paginator;
        });

      this.selectUserSubsciption = this.store
        .select(selectCurrentUser)
        .subscribe((user) => {
          if(user){
            this.userAccountId = user.userId;
          }
        });

    } else {
      //error handling
    }
  }

  ngOnDestroy(): void {
    this.selectFacilityReportsSubscription?.unsubscribe();
    this.selectUserSubsciption?.unsubscribe();
  }
}
