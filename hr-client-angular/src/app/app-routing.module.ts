import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OnboardingDetailComponent } from './pages/hiring-page/onboarding-detail/onboarding-detail.component';
import { OnboardingComponent } from './pages/hiring-page/onboarding/onboarding.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'hiring', component: OnboardingComponent },
  { path: 'onboarding/:userAccountId', component: OnboardingDetailComponent },
  { path: 'employee-profiles', loadChildren: () => import('./pages/employee-profiles-page/employee-profiles-page.module').then(m => m.EmployeeProfilesPageModule) },
  // other routes
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
