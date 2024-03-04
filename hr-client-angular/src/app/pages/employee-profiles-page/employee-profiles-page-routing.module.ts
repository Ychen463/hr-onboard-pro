import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeProfilesPageComponent } from './employee-profiles-page.component';
import { FullEmployeeProfileComponent } from './components/full.employee.profile/full.employee.profile.component';

const routes: Routes = [
  { path: '', component: EmployeeProfilesPageComponent },
  { path: 'full-profile/:userAccountId', component: FullEmployeeProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeProfilesPageRoutingModule {}
