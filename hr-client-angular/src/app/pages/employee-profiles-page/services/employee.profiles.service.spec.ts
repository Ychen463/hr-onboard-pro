import { TestBed } from '@angular/core/testing';

import { EmployeeProfilesService } from './employee.profiles.service';

describe('EmployeeProfilesService', () => {
  let service: EmployeeProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
