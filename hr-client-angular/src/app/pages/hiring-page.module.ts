// hiring-page.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GenerateTokenComponent } from './hiring-page/generate-token/generate-token.component';
import { OnboardingComponent } from './hiring-page/onboarding/onboarding.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [GenerateTokenComponent, OnboardingComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
  ],
  exports: [GenerateTokenComponent,
    OnboardingComponent,
    MatButtonModule,
    MatInputModule,
  ]
})
export class HiringPageModule {}
