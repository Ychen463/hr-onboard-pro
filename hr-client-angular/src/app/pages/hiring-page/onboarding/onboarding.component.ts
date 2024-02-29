import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { ApiService } from 'src/app/services/api.service/api.service';
import { HttpClient } from '@angular/common/http';

import { RegistrationTokenData, DisplayedRegiData } from '../RegistrationToken';
import { UserAccountOnboardingData, DisplayedOnboardingData } from '../UserAccountOnboarding';

import { GenerateTokenComponent } from '../generate-token/generate-token.component';
import {MatDialog} from '@angular/material/dialog';

import { ShortenUrlPipe } from '../pipe/shorten-url.pipe';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OnboardingComponent implements OnInit {
  columnsToDisplay = ['name', 'email', 'tokenStatus','createdDatetime'];
  columnNamesToDisplay: { [key: string]: string } = {
    'name': 'Name',
    'email': 'Email',
    'tokenStatus': 'Status',
    'createdDatetime': 'Created At'
  };
  displayedRegiColumns: string[] = ['Name', 'Email', 'Status', 'Created At'];
  displayedOnbColumns: string[] = ['name', 'email', 'status', 'userAccountId'];
  apiGetAllTokensUrl!: string;
  apiGetAllOnbUrl!: string;



  RegidataSource: MatTableDataSource<DisplayedRegiData>;
  OnbdataSource : MatTableDataSource<DisplayedOnboardingData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
    this.RegidataSource = new MatTableDataSource<DisplayedRegiData>();
    this.OnbdataSource = new MatTableDataSource<DisplayedOnboardingData>();

}

  ngOnInit(): void {
    this.RegidataSource.paginator = this.paginator;
    this.RegidataSource.sort = this.sort;
    this.OnbdataSource.paginator = this.paginator;
    this.OnbdataSource.sort = this.sort;
    this.apiGetAllTokensUrl = this.apiService.getAllRegiTokenUrl();
    this.apiGetAllOnbUrl = this.apiService.getAllOnboardingUrl();
    this.fetchDataFromTokenApi();
    this.fetchDataFromOnboardingApi();

  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue?.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  fetchDataFromTokenApi(): void {
    this.httpClient.get<RegistrationTokenData[]>(this.apiGetAllTokensUrl).subscribe((data) => {
      const DisplayedRegiData = data.map(item => ({
        name: `${item.userFirstName} ${item.userLastName}`,
        email: item.email,
        registrationLink: item.registrationLink,
        tokenStatus: item.tokenStatus,
        createdDatetime: item.createdDatetime
      }));

      this.RegidataSource.data = DisplayedRegiData; 
      this.RegidataSource.paginator = this.paginator;
      this.RegidataSource.sort = this.sort;
    });
  }
  fetchDataFromOnboardingApi(): void {
    this.httpClient.get<UserAccountOnboardingData[]>(this.apiGetAllOnbUrl).subscribe((data) => {
      const DisplayedOnboardingData = data.map(item => ({
        name: `${item.personalInfo.firstName} ${item.personalInfo.lastName}`,
        email: item.email,
        userAccountId: item.userAccountId,
        onboardingStatus: item.onboardingStatus,
      }));
      console.log(data);
      this.OnbdataSource.data = DisplayedOnboardingData; 
      this.OnbdataSource.paginator = this.paginator;
      this.OnbdataSource.sort = this.sort;
    });
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(GenerateTokenComponent, {
      width: '500px',
      height: 'auto',

      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
