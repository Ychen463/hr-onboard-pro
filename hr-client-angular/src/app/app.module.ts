import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { GenerateTokenComponent } from './components/generate-token/generate-token.component';
import { EmployeeProfilesPageComponent } from './pages/employee-profiles-page/employee-profiles-page.component';
import { VisaPageComponent } from './pages/visa-page/visa-page.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { HousingPageComponent } from './pages/housing-page/housing-page.component';
import { HiringPageComponent } from './pages/hiring-page/hiring-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginPageComponent,
    GenerateTokenComponent,
    EmployeeProfilesPageComponent,
    VisaPageComponent,
    OnboardingComponent,
    HousingPageComponent,
    HiringPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
