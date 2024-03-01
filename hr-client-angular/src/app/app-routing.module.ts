import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { OnboardingDetailComponent } from './pages/hiring-page/onboarding-detail/onboarding-detail.component';
import { OnboardingComponent } from './pages/hiring-page/onboarding/onboarding.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'hiring', component: OnboardingComponent },
  { path: 'onboarding/:userAccountId', component: OnboardingDetailComponent },

  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
