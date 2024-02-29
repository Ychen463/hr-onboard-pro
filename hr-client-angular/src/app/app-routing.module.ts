import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { OnboardingComponent } from './pages/hiring-page/onboarding/onboarding.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'hiring', component: OnboardingComponent },
  { path: 'onboarding/:userAccountId', component: OnboardingComponent },

  // other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
