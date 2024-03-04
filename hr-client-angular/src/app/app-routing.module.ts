import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingDetailComponent } from './pages/hiring-page/components/onboarding-detail/onboarding-detail.component';
import { VisaPageComponent } from './pages/visa-page/visa-page.component';
import { VisaPageComponent } from './pages/visa-page/visa-page.component';

import { OnboardingComponent } from './pages/hiring-page/onboarding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  { path: 'hiring', component: OnboardingComponent, canActivate: [AuthGuard] },
  {
    path: 'onboarding/:userAccountId',
    component: OnboardingDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-profiles',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/employee-profiles-page/employee-profiles-page.module').then(
        (m) => m.EmployeeProfilesPageModule
      ),
  },
  {
    path: 'housing',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/housing-page/housing-page.module').then((m) => m.HousingPageModule),
  },
  {
    path: 'visa',
    canActivate: [AuthGuard],
    component: VisaPageComponent,
  },
  // other routes
  { path: '**', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
