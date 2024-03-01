// hiring-page.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';

import { ShortenUrlPipe } from './pipe/shorten-url.pipe';

import { GenerateTokenComponent } from './generate-token/generate-token.component';
import { OnboardingComponent } from './onboarding/onboarding.component';


import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RejectFeedbackDialogComponent } from './reject-feedback-dialog/reject-feedback-dialog.component';
import { OnboardingDetailComponent } from './onboarding-detail/onboarding-detail.component';

@NgModule({
  declarations: [GenerateTokenComponent, 
                OnboardingComponent, 
                RejectFeedbackDialogComponent, 
                OnboardingDetailComponent  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
  ],
  exports: [GenerateTokenComponent,
    OnboardingComponent,
    RejectFeedbackDialogComponent,
    MatButtonModule,
    MatInputModule,


  ]
})
export class HiringPageModule {}
