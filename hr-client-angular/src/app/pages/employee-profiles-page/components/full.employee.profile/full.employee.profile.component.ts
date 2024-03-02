import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeProfilesService } from '../../services/employee.profiles.service';
import { catchError, of } from 'rxjs';
// import { ObjectId } from 'mongodb';
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
    console.log(this.route.snapshot.queryParams);

    if (this.profileService.userAccountIdForDetails) {
      let response = this.profileService.getProfileById(
        this.profileService.userAccountIdForDetails
      );

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
