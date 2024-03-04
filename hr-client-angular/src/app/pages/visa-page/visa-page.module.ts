import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';

import { VisaFeedbackDialogComponent } from './components/visa-feedback-dialog/visa-feedback-dialog.component';
import { VisaPageComponent } from './visa-page.component';
import { StoreModule } from '@ngrx/store';
import { visaReducer } from 'src/app/store/visa/visa.reducer';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [VisaPageComponent, VisaFeedbackDialogComponent],
  imports: [
    StoreModule.forRoot({ visa: visaReducer }),
    CommonModule,
    MatDividerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserModule,
    // SharedModule,
  ],
  exports: [VisaPageComponent],
})
export class VisaPageModule {}
