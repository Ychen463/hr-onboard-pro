import { Component, OnInit, Input } from '@angular/core';
import { HousingProfile, Resident } from '../../interfaces/housing.interfaces';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-residents-tab',
  templateUrl: './residents.tab.component.html',
  styleUrls: ['./residents.tab.component.css']
})
export class ResidentsTabComponent implements OnInit {
  @Input() housingProfile: HousingProfile | null = null;
  // dataSource = new MatTableDataSource<Resident>();
  columnsToDisplay: string[] = ['userFirstName', "userLastName", 'email'];

  constructor(private router: Router) { }

  ngOnInit(): void {}

  get dataSource(): MatTableDataSource<Resident> {
    return new MatTableDataSource<Resident>(this.housingProfile?.residents || []);
  }

  navigateToResidentDetails(userAccountId: string) {
    this.router.navigate(['employee-profiles/full-profile', userAccountId]);
  }
}
