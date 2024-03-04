import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeProfilesService } from '../../services/employee.profiles.service';
import { Subscription } from 'rxjs';
import {
  selectProfileSummariesByName,
  selectAllProfileSummaries,
} from 'src/app/store/employee-profile/employee.profile.selectors';
import { ProfileSummary } from '../../interfaces/employee.profile.interfaces';
import { Store } from '@ngrx/store';
import { VisaState } from 'src/app/store/visa/visa.models';

@Component({
  selector: 'app-employee-profiles-table',
  templateUrl: './employee.profiles.table.component.html',
  styleUrls: ['./employee.profiles.table.component.css'],
})
export class EmployeeProfilesTableComponent implements OnInit, OnDestroy {
  columnsToDisplay: string[] = ['name', 'email', 'phone', 'workAuthorization', 'ssn'];
  dataSource = new MatTableDataSource<ProfileSummary>();

  query = '';

  selectProfileSummariesSubscription: Subscription | undefined;
  selectProfileSummariesByNameSubscription: Subscription | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private profileService: EmployeeProfilesService,
    private router: Router,
    private store: Store<VisaState>,
  ) {}

  ngOnInit(): void {
    this.profileService.getProfileSummary();

    this.selectProfileSummariesSubscription = this.store
      .select(selectAllProfileSummaries)
      .subscribe((summaries) => {
        if (summaries) {
          this.dataSource.data = summaries;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.selectProfileSummariesSubscription?.unsubscribe();
    this.selectProfileSummariesByNameSubscription?.unsubscribe();
  }

  navigateToDetails(userAccountId: string) {
    this.router.navigate(['employee-profiles/full-profile', userAccountId]);
  }

  handleSearch(): void {
    this.selectProfileSummariesByNameSubscription = this.store
      .select(selectProfileSummariesByName(this.query))
      .subscribe((summaries) => {
        if (summaries) {
          this.dataSource.data = summaries;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
