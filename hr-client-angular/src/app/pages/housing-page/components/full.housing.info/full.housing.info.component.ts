import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectHousingProfileById } from 'src/app/store/housing/housing.selectors';
import { HousingProfile } from '../../interfaces/housing.interfaces';

@Component({
  selector: 'app-full.housing.info',
  templateUrl: './full.housing.info.component.html',
  styleUrls: ['./full.housing.info.component.css']
})
export class FullHousingInfoComponent implements OnInit {
  housingProfile: HousingProfile | null = null;

  selectProfileByIdSubscription: Subscription | undefined;

  constructor(
    private houseService: HousingService, 
    private store: Store,
    private route: ActivatedRoute
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
    } else {
      //error handling
    }
  }

}
