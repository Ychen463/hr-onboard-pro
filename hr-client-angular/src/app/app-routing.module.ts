import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingDetailComponent } from './pages/hiring-page/components/onboarding-detail/onboarding-detail.component';
import { OnboardingComponent } from './pages/hiring-page/onboarding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  { path: 'hiring', component: OnboardingComponent },
  { path: 'onboarding/:userAccountId', component: OnboardingDetailComponent },
  {
    path: 'employee-profiles',
    loadChildren: () =>
      import('./pages/employee-profiles-page/employee-profiles-page.module').then(
        (m) => m.EmployeeProfilesPageModule
      ),
  },
  {
    path: 'housing',
    loadChildren: () =>
      import('./pages/housing-page/housing-page.module').then((m) => m.HousingPageModule),
  },
  // other routes
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
