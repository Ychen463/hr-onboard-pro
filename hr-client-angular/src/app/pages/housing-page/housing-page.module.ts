import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';

import { HousingPageRoutingModule } from './housing-page-routing.module';
import { HousingPageComponent } from './housing-page.component';
import { FullHousingInfoComponent } from './components/full.housing.info/full.housing.info.component';
import { HousingSummaryViewComponent } from './components/housing.summary.view/housing.summary.view.component';
import { HousingService } from './services/housing.service';
import { FacilityReportService } from './services/facility.report.service';
import { CreateHousingDialogComponent } from './components/create.housing.dialog/create.housing.dialog.component';
import { HousingInfoTabComponent } from './components/housing.info.tab/housing.info.tab.component';
import { FacilityReportsTabComponent } from './components/facility.reports.tab/facility.reports.tab.component';
import { ResidentsTabComponent } from './components/residents.tab/residents.tab.component';
import { FacilityReportCardComponent } from './components/facility.report.card/facility.report.card.component';
import { AddCommentDialogComponent } from './components/add.comment.dialog/add.comment.dialog.component';
import { EditCommentDialogComponent } from './components/edit.comment.dialog/edit.comment.dialog.component';

@NgModule({
  declarations: [
    HousingPageComponent, 
    FullHousingInfoComponent, 
    HousingSummaryViewComponent, 
    CreateHousingDialogComponent, 
    HousingInfoTabComponent, 
    FacilityReportsTabComponent, 
    ResidentsTabComponent, FacilityReportCardComponent, AddCommentDialogComponent, EditCommentDialogComponent
  ],
  imports: [
    CommonModule,
    HousingPageRoutingModule,
    FormsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
  ],
  providers: [ HousingService, FacilityReportService ],
})
export class HousingPageModule {}
