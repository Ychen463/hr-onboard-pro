import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';

import { ApiService } from 'src/app/services/api.service/api.service';
import { HttpClient } from '@angular/common/http';

import { RegistrationTokenData, DisplayedRegiData } from '../RegistrationToken';
import { UserAccountOnboardingData, DisplayedOnboardingData } from '../UserAccountOnboarding';

import { GenerateTokenComponent } from '../generate-token/generate-token.component';
import { RejectFeedbackDialogComponent} from '../reject-feedback-dialog/reject-feedback-dialog.component'
import { MatDialog} from '@angular/material/dialog';

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
  obStatuses = ['None','Not Started','Pending', 'Rejected', 'Completed'];
  columnNamesToDisplay: { [key: string]: string } = {
    'name': 'Name',
    'email': 'Email',
    'tokenStatus': 'Status',
    'createdDatetime': 'Created At'
  };
  displayedRegiColumns: string[] = ['Name', 'Email', 'Status', 'Created At'];
  displayedOnbColumns: string[] = ['name', 'email', 'status', 'action'];
  apiGetAllTokensUrl!: string;
  apiGetAllOnbUrl!: string;
  selectedStatus: string = 'None';

  selectionChanged(): void {
    if (this.selectedStatus === 'Completed') {
      this.selectedStatus = 'Approved';
    }
    this.fetchDataFromOnboardingApi(this.selectedStatus);
  }


  RegidataSource: MatTableDataSource<DisplayedRegiData>;
  OnbdataSource : MatTableDataSource<DisplayedOnboardingData>;
  @ViewChild('paginator1') RegiMatPaginator!: MatPaginator;
  @ViewChild('paginator2') OnbMatPaginator!: MatPaginator;
  @ViewChild('sort1') RegiMatSort!: MatSort;
  @ViewChild('sort2') OnbMatSort!: MatSort;

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {
    this.RegidataSource = new MatTableDataSource<DisplayedRegiData>();
    this.OnbdataSource = new MatTableDataSource<DisplayedOnboardingData>();

}

ngOnInit(): void {
  this.RegidataSource.paginator = this.RegiMatPaginator;
  this.RegidataSource.sort = this.RegiMatSort;
  this.OnbdataSource.paginator = this.OnbMatPaginator;
  this.OnbdataSource.sort = this.OnbMatSort;
  this.apiGetAllTokensUrl = this.apiService.getAllRegiTokenUrl();
  this.apiGetAllOnbUrl = this.apiService.getAllOnboardingUrl();


  this.fetchDataFromTokenApi();
  this.selectedStatus = 'None';
  this.fetchDataFromOnboardingApi(this.selectedStatus);
}



  fetchDataFromTokenApi(): void {
    this.httpClient.get<RegistrationTokenData[]>(this.apiGetAllTokensUrl).subscribe((data) => {
      const DisplayedRegiData = data.map(item => ({
        name: `${item.userFirstName} ${item.userLastName}`,
        email: item.email,
        registrationLink: item.registrationLink,
        tokenStatus: item.tokenStatus,
        createdDatetime: item.createdDatetime
      }));
      this.RegidataSource.sort = this.RegiMatSort;
    this.RegidataSource.paginator = this.RegiMatPaginator;
    this.RegidataSource.data = DisplayedRegiData; 
    });
  }
  
  fetchDataFromOnboardingApi(selectedStatus: string): void {
    this.httpClient.get<UserAccountOnboardingData[]>(this.apiGetAllOnbUrl).subscribe((data) => {
      let filteredData = data;
      if (selectedStatus !== 'None') {
        
        filteredData = data.filter(item => item.onboardingStatus.replace(/\s/g, '').toLowerCase() === selectedStatus.replace(/\s/g, '').toLowerCase());
      }
      const displayedOnboardingData = filteredData.map(item => ({
        name: `${item.personalInfo.firstName} ${item.personalInfo.lastName}`,
        email: item.email,
        userAccountId: item.userAccountId,
        onboardingStatus: item.onboardingStatus,
      }));
      
      this.OnbdataSource.paginator = this.OnbMatPaginator;
      this.OnbdataSource.sort = this.OnbMatSort;
      this.OnbdataSource.data = displayedOnboardingData; 
    });
  }
  

  openGenToeknDialog(): void {
    const dialogRef = this.dialog.open(GenerateTokenComponent, {
      width: '500px',
      height: 'auto',

      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  handleObApprove(userAccountId: string): void {
    const apiPatchDecisionbUrl = this.apiService.getOnboardingDecisionUrl(userAccountId);
    console.log(apiPatchDecisionbUrl);
        this.httpClient.patch(apiPatchDecisionbUrl, { hrDecision: 'Approved' }).subscribe(
      (data) => {
        console.log('Approval successful:', data);
      },
      (error) => {
        console.error('Error occurred during approval:', error);
      }
    );
  }
  
  
  openRejectConfirmationDialog(userAccountId: string): void {
    const dialogRef = this.dialog.open(RejectFeedbackDialogComponent, {
      width: '500px',
      height: 'auto',
      data: { userAccountId: userAccountId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  



}
