import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeProfilesService } from '../../services/employee.profiles.service';
import { catchError, of } from 'rxjs';
import { FullProfile, FullProfileResponse } from '../../interfaces/employee.profile.interfaces';

@Component({
  selector: 'app-full.employee.profile',
  templateUrl: './full.employee.profile.component.html',
  styleUrls: ['./full.employee.profile.component.css'],
})
export class FullEmployeeProfileComponent implements OnInit {
  profile: FullProfile | undefined;

  constructor(
    private profileService: EmployeeProfilesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let userAccountId = this.route.snapshot.paramMap.get('userAccountId');
    if(userAccountId){
      let response = this.profileService.getProfileById(userAccountId);
      
      response.pipe(catchError((err) => of([{ err }]))).subscribe((body: any) => {
        const profileResponse = body as FullProfileResponse;

        if (profileResponse && profileResponse.profile) {
          this.profile = profileResponse.profile;
        }
      });
    } else {
      // error handling
    }
  }
}
