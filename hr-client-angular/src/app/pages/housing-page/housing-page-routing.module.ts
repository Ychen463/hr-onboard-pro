import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingPageComponent } from './housing-page.component';
import { FullHousingInfoComponent } from './components/full.housing.info/full.housing.info.component';

const routes: Routes = [
  { path: '', component: HousingPageComponent }, 
  { path: 'housing-details/:housingId', component: FullHousingInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousingPageRoutingModule { }
