import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { EmployeeProfilesPageRoutingModule } from './employee-profiles-page-routing.module';
import { EmployeeProfilesPageComponent } from './employee-profiles-page.component';
import { EmployeeProfilesTableComponent } from './components/employee.profiles.table/employee.profiles.table.component';
import { EmployeeProfilesService } from './services/employee.profiles.service';
import { FullEmployeeProfileComponent } from './components/full.employee.profile/full.employee.profile.component';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EmployeeProfilesPageComponent,
    EmployeeProfilesTableComponent,
    FullEmployeeProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeProfilesPageRoutingModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    // SharedModule,
  ],
  providers: [EmployeeProfilesService],
})
export class EmployeeProfilesPageModule {}
