import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service/api.service';
import { Onboarding, PersonalInfo, Address, ContactSchema, 
  CarInformation, CitizenshipStatus, DriverLicense ,Referral, EmergencyContact, EmergencyContacts, VisaInfo } from '../stores/models/onboarding.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-onboarding-detail',
  templateUrl: './onboarding-detail.component.html',
  styleUrls: ['./onboarding-detail.component.css']
})
export class OnboardingDetailComponent implements OnInit {
  apiGetOneOnbUrl!: string;
  userAccountId!: string;
  onboardingData!: Onboarding;
  personalInfoData! : PersonalInfo;
  currentAddressData! : Address;
  contactData! : ContactSchema;
  carInfomationData!: CarInformation;
  citizenshipStatusData!: CitizenshipStatus;
  driverLicenseData!: DriverLicense;
  referralData!: Referral;
  emergencyContactsData!: EmergencyContact[];
  visaInfoData!: VisaInfo;
  dataSource = new MatTableDataSource<EmergencyContact>([]);
  displayedColumns: string[] = ['name', 'phone', 'email', 'relationship'];

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userAccountId = params['userAccountId'];
      this.apiGetOneOnbUrl = this.apiService.getOneOnboardingUrl(this.userAccountId);
      console.log('User Account ID:', this.userAccountId);
      this.fetchDataFromOnboardingApi(); // Call this method here or wherever appropriate in your component lifecycle
      
    });
  }

  fetchDataFromOnboardingApi(): void {
    this.httpClient.get<{ onboardingData: Onboarding }>(this.apiGetOneOnbUrl).subscribe(
      (response) => {
        this.onboardingData = response.onboardingData;
        this.personalInfoData = response.onboardingData.personalInfo;
        this.currentAddressData = response.onboardingData.personalInfo.currentAddress;
        this.contactData = response.onboardingData.personalInfo.contactSchema;
        this.carInfomationData = response.onboardingData.personalInfo.carInformation;
        this.citizenshipStatusData = response.onboardingData.citizenshipStatus;
        this.driverLicenseData = response.onboardingData.driverLicense;
        this.referralData = response.onboardingData.referral;
        this.emergencyContactsData = response.onboardingData.emergencyContacts;



        // Update your dataSource with the retrieved data
        this.dataSource.data = this.emergencyContactsData;

      },
      (error) => {
        console.error('Error fetching onboarding data:', error);
        // Handle error (e.g., show error message to user)
      }
    );

  }
}