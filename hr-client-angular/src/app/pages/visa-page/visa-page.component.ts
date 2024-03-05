import { Store } from '@ngrx/store';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger} from '@angular/animations';

import { VisaService } from './services/visa.service';
import { Visa } from '../../pages/visa-page/interfaces/visa.model';
import { DisplayedVisa } from '../../pages/visa-page/interfaces/displayedVisa.model';
import { VisaFeedbackDialogComponent } from './components/visa-feedback-dialog/visa-feedback-dialog.component'
import { VisaState } from 'src/app/store/visa/visa.models';




@Component({
  selector: 'app-visa-page',
  templateUrl: './visa-page.component.html',
  styleUrls: ['./visa-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class VisaPageComponent implements OnInit, AfterViewInit {
  allDisplayedColumns: string[] = ['name', 'visaTitle', 'startDate', 'endDate','daysRemaining','nextStep'];
  inpDisplayedColumns: string[] = ['name', 'visaTitle', 'startDate', 'endDate','daysRemaining','nextStep', 'action'];


  // expandable
  columnsToDisplay = ['name', 'visaTitle', 'startDate', 'endDate','daysRemaining','nextStep'];
  columnNamesToDisplay: { [key: string]: string } = {
    'name': 'Name',
    'visaTitle': 'Visa Title',
    'startDate': 'Start Date',
    'endDate': 'End Date',
    'daysRemaining': 'Days Remaining',
    'nextStep': 'Next Step'
  };

  inPDataSource!: MatTableDataSource<DisplayedVisa>;
  allDataSource!: MatTableDataSource<DisplayedVisa>;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  visas: Visa[] = [];

  @ViewChild('allMatPaginator') allMatPaginator!: MatPaginator;
  @ViewChild('inPMatPaginator') inPMatPaginator!: MatPaginator;
  @ViewChild('allSort') allMatSort!: MatSort;
  @ViewChild('inPsort') inPMatSort!: MatSort;
// Function to check if a row is expanded
isExpanded(row: any): boolean {
  return false; // Example: always return false for demonstration
}
  constructor(
    public dialog: MatDialog,
    private visaService: VisaService,
    private store: Store<{ visa: VisaState}>

  ) { }

  ngOnInit(): void {
    this.allDataSource = new MatTableDataSource<DisplayedVisa>([]);
    this.inPDataSource = new MatTableDataSource<DisplayedVisa>([]);

    this.loadVisas();
  }

  ngAfterViewInit() {
    if (this.allDataSource) {
      this.allDataSource.paginator = this.allMatPaginator;
      this.allDataSource.sort = this.allMatSort;
    }
    if (this.inPDataSource) {
      this.inPDataSource.paginator = this.inPMatPaginator;
      this.inPDataSource.sort = this.inPMatSort;
    }
    
  }
  
  async loadVisas(): Promise<void> {
    try {
      const response = await this.visaService.getAllVisas().toPromise();
  
      // Check if the response is not undefined
      if (response !== undefined) {
        // Proceed with processing the response
        this.visas = response;
        this.allDataSource.data = this.mapVisasToDisplayed(response);
        this.inPDataSource.data = this.mapVisasToDisplayed(response.filter(visa => 
          !visa.docs.i20.status.endsWith('Approved')));

          console.log(this.inPDataSource.data.length)
              } else {
        // Handle the case where response is undefined
        console.error('No data returned from the service');
      }
    } catch (error) {
      console.error('Error loading visas:', error);
    }
  }
  
  private mapVisasToDisplayed(visas: Visa[]): DisplayedVisa[] {
    return visas.map(visa => {


      const startDateString = visa.onboardingInfo[0].citizenshipStatus.startEndDate.startDate;
      const endDateString = visa.onboardingInfo[0].citizenshipStatus.startEndDate.endDate;
      
      const startDate = new Date(startDateString);
      const endDate = new Date(endDateString);
      const currentTime = new Date();
      
      const keysInOrder = ['optReceipt', 'optEAD', 'i983', 'i20'];
      const key = keysInOrder.reverse().find(key => visa.docs[key]?.docUrl);
      const docUrl = visa.docs[key as string].docUrl;
      const daysRemaining = Math.ceil((endDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)); 
      console.log(docUrl,key)
            return {
            lastDocUploadedKey : key,
            userAccountId: visa.userAccountId,
            name: `${visa.onboardingInfo[0].personalInfo.firstName} 
            ${visa.onboardingInfo[0].personalInfo.middleName} 
            ${visa.onboardingInfo[0].personalInfo.lastName} 
            (${visa.onboardingInfo[0].personalInfo.preferredName})`,
            visaTitle: visa.onboardingInfo[0].citizenshipStatus.workAuthorization 
            ? visa.onboardingInfo[0].citizenshipStatus.workAuthorization 
            : visa.onboardingInfo[0].citizenshipStatus.workAuthorizationOtherTitle ?? '',
                      startDate: startDate,
            endDate: endDate,
            daysRemaining: daysRemaining,
            // nextStep: visa.visaStatus,
            visaStatus: visa.visaStatus,
            docs: {optEAD: visa.docs.optEAD.docUrl,
              optReceipt: visa.docs.optReceipt.docUrl,
              i20: visa.docs.i20.docUrl,
              i983:visa.docs.i983.docUrl
            } ,
            nextStep: (() => {
              if (visa.visaStatus === "OPT EAD-Approved") {
                  return "OPT RECEIPT-Await";
              } else if (visa.visaStatus === "OPT RECEIPT-Approved") {
                  return "I983-Await";
              } else if (visa.visaStatus === "I983-Approved") {
                  return "I20-Await";
              } else if (visa.visaStatus === "I20-Approved") {
                  return "Completed";
              } else {
                  return visa.visaStatus;
              }
          })(),
            lastDocUrl: docUrl,
        };
    });
}


  applyFilter(dataType: String,event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (dataType == 'ip') {
      this.inPDataSource.filter = filterValue.trim().toLowerCase();
      if (this.inPDataSource.paginator) {
        this.inPDataSource.paginator.firstPage();
      }
    }
    if (dataType == 'al') {
      this.allDataSource.filter = filterValue.trim().toLowerCase();
    }
    
  }



  

  openRejDialog(hrDecision: string, userAccountId: string, lastDocKey:string): void {
      this.dialog.open(VisaFeedbackDialogComponent, {
        width: '500px',
        height: 'auto',
        data: { userAccountId, lastDocKey, hrDecision }
      });

  
  
}

}