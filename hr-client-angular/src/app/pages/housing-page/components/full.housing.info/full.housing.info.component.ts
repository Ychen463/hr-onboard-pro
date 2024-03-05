import { Component, OnInit, OnDestroy } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectHousingProfileById } from 'src/app/store/housing/housing.selectors';
import { selectError } from 'src/app/store/facility-report/facility.report.selectors';
import { HousingProfile } from '../../interfaces/housing.interfaces';

@Component({
  selector: 'app-full.housing.info',
  templateUrl: './full.housing.info.component.html',
  styleUrls: ['./full.housing.info.component.css']
})
export class FullHousingInfoComponent implements OnInit, OnDestroy {
  housingProfile: HousingProfile | null = null;

  selectProfileByIdSubscription: Subscription | undefined;
  selectLoadingSubscription: Subscription | undefined;
  selectErrorSubscription: Subscription | undefined;

  constructor(
    private houseService: HousingService, 
    private store: Store,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let housingId = this.route.snapshot.paramMap.get('housingId');
    
    if(housingId){
      this.houseService.getProfileById(housingId);

      this.selectProfileByIdSubscription = this.store
      .select(selectHousingProfileById(housingId))
      .subscribe((profile) => {
        if(profile){
          this.housingProfile = profile;
          console.log(this.housingProfile);
        }
      });

      this.selectErrorSubscription = this.store
      .select(selectError)
      .subscribe((error) => {
        if(error){
          this.snackBar.open(error, 'Okay');
        }
      });
    } else {
      //error handling
    }

    
  }

  ngOnDestroy(): void {
    this.selectProfileByIdSubscription?.unsubscribe();
    this.selectLoadingSubscription?.unsubscribe();
    this.selectErrorSubscription?.unsubscribe();
  }
}
