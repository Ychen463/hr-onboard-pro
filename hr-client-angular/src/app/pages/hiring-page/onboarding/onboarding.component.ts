import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/services/api.service/api.service';
import { HttpClient } from '@angular/common/http';

import { RegistrationTokenData, DisplayedData } from '../registrationToken';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'registrationLink'];
  apiGetAllTokensUrl!: string;
  apiPostGenTokenUrl!: string;
  dataSource: MatTableDataSource<DisplayedData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private httpClient: HttpClient,
    private apiService: ApiService
  ) {
    // const registrationTokens = Array.from({ length: 100 }, (_, k) => 
    // this.createNewRegistrationToken("I20-ra",
    //                                 "I20-ra",
    //                                 "I20-ar@gamil.com"));
    this.dataSource = new MatTableDataSource<DisplayedData>();
}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.apiGetAllTokensUrl = this.apiService.getAllRegiTokenUrl();
    this.apiPostGenTokenUrl = this.apiService.postGenerateRegiTokenUrl();
    this.fetchDataFromApi();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue?.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchDataFromApi(): void {
    this.httpClient.get<RegistrationTokenData[]>(this.apiGetAllTokensUrl).subscribe((data) => {
      const displayedData = data.map(item => ({
        name: `${item.userFirstName} ${item.userLastName}`,
        email: item.email,
        registrationLink: item.registrationLink,
        status: item.tokenStatus
      }));

      this.dataSource.data = displayedData; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  /** Creates and returns a new RegistrationTokenData. */
  createNewRegistrationToken(userFirstName: string, userLastName: string, email: string): void {
    const newRegistrationToken = {
      userFirstName: userFirstName,
      userLastName: userLastName,
      email: email
    };

    this.httpClient.post(this.apiPostGenTokenUrl, newRegistrationToken).subscribe((response) => {
      // 处理 POST 请求的响应
      console.log(response);
    });
  }

}
