import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';

import { DisplayedRegistrationToken } from '../../../store/hiring/models/registrationToken.model';
import { DisplayedOnboarding } from '../../../store/hiring/models/onboarding.model';

import { GenerateTokenComponent } from '../generate-token/generate-token.component';
import { RejectFeedbackDialogComponent} from '../reject-feedback-dialog/reject-feedback-dialog.component'
import { MatDialog} from '@angular/material/dialog';
import { RegistrationTokenActions } from '../../../store/hiring/actions/registrationToken.actions';
import { OnboardingService } from '../../../services/hiring.service/onboarding.services';
import { RegistrationTokenService } from '../../../services/hiring.service/registrationToken.services';

import { OnboardingState, RegistrationTokenState } from '../../../store/hiring/models/hiring.state';
import { loadOnboardingsFailure, loadOnboardingsStart, loadOnboardingsSuccess, updateOnboardingSuccess } from '../../../store/hiring/actions/onboarding.actions';
import { Subscription } from 'rxjs';


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
export class OnboardingComponent implements OnInit,OnDestroy {
  private updatesSubscription: Subscription = new Subscription();

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


  RegidataSource: MatTableDataSource<DisplayedRegistrationToken>;
  OnbdataSource : MatTableDataSource<DisplayedOnboarding>;
  @ViewChild('paginator1') RegiMatPaginator!: MatPaginator;
  @ViewChild('paginator2') OnbMatPaginator!: MatPaginator;
  @ViewChild('sort1') RegiMatSort!: MatSort;
  @ViewChild('sort2') OnbMatSort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private onboardingService: OnboardingService,
    private registrationTokenService: RegistrationTokenService,
    private store: Store<{ onboarding: OnboardingState, registrationToken :RegistrationTokenState}>
  ) {
    this.RegidataSource = new MatTableDataSource<DisplayedRegistrationToken>();
    this.OnbdataSource = new MatTableDataSource<DisplayedOnboarding>();


  }

ngOnInit(): void {
  this.initializeData();
  this.RegidataSource.paginator = this.RegiMatPaginator;
  this.RegidataSource.sort = this.RegiMatSort;
  this.OnbdataSource.paginator = this.OnbMatPaginator;
  this.OnbdataSource.sort = this.OnbMatSort;
  this.store.dispatch(loadOnboardingsStart());
  this.store.dispatch(RegistrationTokenActions.loadtokensstart());

  this.selectedStatus = 'None';
  this.updatesSubscription.add(
    this.onboardingService.dataUpdated$.subscribe(() => {
      this.fetchDataFromOnboardingApi(this.selectedStatus);
    })
  );

  this.updatesSubscription.add(
    this.registrationTokenService.dataUpdated$.subscribe(() => {
      this.fetchDataFromTokenApi();
    })
  );

}
ngAfterViewInit() {
  this.OnbdataSource.paginator = this.OnbMatPaginator;
  this.OnbdataSource.sort = this.OnbMatSort;
}
ngOnDestroy(): void {
  this.updatesSubscription.unsubscribe();
}
private initializeData(): void {
  this.fetchDataFromTokenApi();
  this.fetchDataFromOnboardingApi(this.selectedStatus);
  this.subscribeToDataUpdates();
}

subscribeToDataUpdates(): Subscription {
  const combinedSubscription = new Subscription();

  const onboardingSubscription = this.onboardingService.dataUpdated$.subscribe(() => {
    this.fetchDataFromOnboardingApi(this.selectedStatus);
  });
  combinedSubscription.add(onboardingSubscription);

  const tokenSubscription = this.registrationTokenService.dataUpdated$.subscribe(() => {
    this.fetchDataFromTokenApi();
  });
  combinedSubscription.add(tokenSubscription);

  return combinedSubscription;
}

fetchDataFromTokenApi(): void {
  this.store.dispatch(RegistrationTokenActions.loadtokensstart());
  this.registrationTokenService.getAllTokens().subscribe({
    next: (data) => {
      const displayedRegiData = data.map(item => ({
        name: item.name,
        email: item.email,
        registrationLink: item.registrationLink,
        tokenStatus: item.tokenStatus,
        createdDatetime: item.createdDatetime,
      }));
            this.RegidataSource.data = displayedRegiData; 
            this.applyPaginatorAndSort();
    },
    error: (error) => {
      console.error('Error fetching registration tokens:', error.message);
      this.store.dispatch(RegistrationTokenActions.loadtokensfailure({ error: error.message }));
    }
  });
}
private applyPaginatorAndSort(): void {
  this.RegidataSource.sort = this.RegiMatSort;
  this.RegidataSource.paginator = this.RegiMatPaginator;
}

  fetchDataFromOnboardingApi(selectedStatus: string): void {
    this.store.dispatch(loadOnboardingsStart());
  
    this.onboardingService.getOnboardings().subscribe({
      next: (data) => {
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
          this.store.dispatch(loadOnboardingsSuccess({ onboardings: filteredData }));
        this.OnbdataSource.paginator = this.OnbMatPaginator;
        this.OnbdataSource.sort = this.OnbMatSort;
        this.OnbdataSource.data = displayedOnboardingData; 
      },
      error: (error) => this.store.dispatch(loadOnboardingsFailure({ error }))
    });
  }
  

  openGenToeknDialog(): void {
    const dialogRef = this.dialog.open(GenerateTokenComponent, {
      width: '500px',
      height: 'auto',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  private handleUpdateError(error: any) {
    console.error('Error occurred during onboarding update:', error);
    this.snackBar.open('Error occurred during approval: ' + error.message, 'Close', {
      duration: 5000, 
    });
  }

  handleObUpdate(userAccountId: string, hrDecision: string): void {
    if (hrDecision === 'Approved') {
      this.onboardingService.updateOnboarding(userAccountId, { hrDecision }).subscribe({
        next: () => {
          this.store.dispatch(updateOnboardingSuccess({ userAccountId, onboardingStatus: hrDecision }));
          this.snackBar.open(`Onboarding has been approved for: ${userAccountId}`, 'Close', {
            duration: 5000, 
          });
        },
        error: (error) => this.handleUpdateError(error)
      });
    } else if (hrDecision === 'Rejected') {
      this.openRejectConfirmationDialog(userAccountId);
    }
    
  }
  
  
  openRejectConfirmationDialog(userAccountId: string): void {
    const dialogRef = this.dialog.open(RejectFeedbackDialogComponent, {
      width: '500px',
      height: 'auto',
      data: { userAccountId }
    });
    dialogRef.afterClosed().subscribe(rejFeedback => {
      if (rejFeedback) {
        this.onboardingService.updateOnboarding(userAccountId, { hrDecision: 'Rejected', rejFeedback }).subscribe({
          next: () => {
            this.store.dispatch(updateOnboardingSuccess({ userAccountId, onboardingStatus: 'Rejected', rejFeedback }));
          },
          error: (error) => this.handleUpdateError(error)
        });
      }
    });
  }
  



}
