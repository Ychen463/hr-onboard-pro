import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../../services/api.service';
import { OnboardingDetailService } from '../../services/onboarding-detail.services';
import {
  loadOnboarding,
  loadOnboardingSuccess,
  loadOnboardingFailure,
  updateOnboardingSuccess,
} from '../../../../store/hiring/actions/onboarding-details.actions';
import {
  Onboarding,
  PersonalInfo,
  Address,
  ContactSchema,
  CarInformation,
  CitizenshipStatus,
  DriverLicense,
  Referral,
  EmergencyContact,
  VisaInfo,
} from '../../interfaces/onboarding.model';
import { RejectFeedbackDialogComponent } from '../reject-feedback-dialog/reject-feedback-dialog.component';

@Component({
  selector: 'app-onboarding-detail',
  templateUrl: './onboarding-detail.component.html',
  styleUrls: ['./onboarding-detail.component.css'],
})
export class OnboardingDetailComponent implements OnInit, OnDestroy {
  apiGetOneOnbUrl!: string;
  userAccountId!: string;
  onboardingData!: Onboarding;
  personalInfoData!: PersonalInfo;
  currentAddressData!: Address;
  contactData!: ContactSchema;
  carInfomationData!: CarInformation;
  citizenshipStatusData!: CitizenshipStatus;
  driverLicenseData!: DriverLicense;
  referralData!: Referral;
  emergencyContactsData!: EmergencyContact[];
  visaInfoData!: VisaInfo;
  dataSource = new MatTableDataSource<EmergencyContact>([]);
  displayedColumns: string[] = ['name', 'phone', 'email', 'relationship'];
  onboardingData$: Observable<Onboarding>;
  dataUpdateSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private apiService: ApiService,
    private onboardingDetailService: OnboardingDetailService,
    private store: Store<{ onboarding: Onboarding }>,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.onboardingData$ = this.store.select((state) => state.onboarding['Onboarding']);
  }

  ngOnInit(): void {
    this.subscribeToUpdateNotifications();

    this.route.params.subscribe((params) => {
      this.userAccountId = params['userAccountId'];
      this.apiGetOneOnbUrl = this.apiService.getOneOnboardingUrl(this.userAccountId);
      this.fetchDataFromOnboardingApi();
    });
  }

  ngOnDestroy(): void {
    if (this.dataUpdateSubscription) {
      this.dataUpdateSubscription.unsubscribe();
    }
  }

  private subscribeToUpdateNotifications() {
    this.dataUpdateSubscription = this.onboardingDetailService
      .getDataUpdatedObservable()
      .subscribe(() => {
        this.fetchDataFromOnboardingApi();
      });
  }

  fetchDataFromOnboardingApi(): void {
    this.store.dispatch(loadOnboarding());
    this.httpClient.get<{ onboardingData: Onboarding }>(this.apiGetOneOnbUrl).subscribe(
      (response) => {
        this.store.dispatch(loadOnboardingSuccess({ onboardingData: response.onboardingData }));
        this.onboardingData = response.onboardingData;
        this.personalInfoData = response.onboardingData.personalInfo;
        this.currentAddressData = response.onboardingData.personalInfo.currentAddress;
        this.contactData = response.onboardingData.personalInfo.contactSchema;
        this.carInfomationData = response.onboardingData.personalInfo.carInformation;
        this.citizenshipStatusData = response.onboardingData.citizenshipStatus;
        this.driverLicenseData = response.onboardingData.driverLicense;
        this.referralData = response.onboardingData.referral;
        this.emergencyContactsData = response.onboardingData.emergencyContacts;
        this.dataSource.data = this.emergencyContactsData;
      },
      (error) => {
        this.store.dispatch(loadOnboardingFailure({ error }));
      }
    );
  }

  handleObUpdate(userAccountId: string, hrDecision: string): void {
    if (hrDecision === 'Approved') {
      this.onboardingDetailService.updateOnboarding(userAccountId, hrDecision).subscribe({
        next: () => {
          this.handleSuccessUpdate(userAccountId, 'approved');
        },
        error: (error) => this.handleUpdateError(error),
      });
    } else if (hrDecision === 'Rejected') {
      this.openRejectConfirmationDialog(userAccountId);
    }
  }

  private handleSuccessUpdate(userAccountId: string, action: string) {
    this.store.dispatch(updateOnboardingSuccess({ userAccountId, onboardingStatus: action }));
    const message = action === 'approved' ? 'approved' : 'rejected';
    this.snackBar.open(`Onboarding has been ${message} for: ${userAccountId}`, 'Close', {
      duration: 5000,
    });
  }

  private handleUpdateError(error: any) {
    console.error('Error occurred during onboarding update:', error);
    this.snackBar.open('Error occurred during approval: ' + error.message, 'Close', {
      duration: 5000,
    });
  }

  openRejectConfirmationDialog(userAccountId: string): void {
    const dialogRef = this.dialog.open(RejectFeedbackDialogComponent, {
      width: '500px',
      height: 'auto',
      data: { userAccountId },
    });
  }
}
