import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { authReducer } from './store/auth/auth.reducer';
import { visaReducer } from './store/visa/visa.reducer';
import { employeeProfileReducer } from './store/employee-profile/employee.profile.reducer';
import { onboardingReducer } from './store/hiring/reducers/onboarding.reducer';
import { registrationTokenReducer } from './store/hiring/reducers/registrationToken.reducer';
import { housingReducer } from './store/housing/housing.reducer';
import { facilityReportReducer } from './store/facility-report/facility.report.reducer';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HiringPageModule } from './pages/hiring-page/hiring-page.module';
import { VisaPageModule } from './pages/visa-page/visa-page.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MatSidenavModule } from '@angular/material/sidenav';

import { LoginPageModule } from './pages/login-page/login-page.module';
import { RouterModule } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, NavigationBarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      auth: authReducer,
      employeeProfile: employeeProfileReducer,
      registrationToken: registrationTokenReducer,
      onboarding: onboardingReducer,
      housing: housingReducer,
      facilityReport: facilityReportReducer,
      visa: visaReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatDividerModule,
    HiringPageModule,
    VisaPageModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonToggleModule,
    LoginPageModule,
    RouterModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
