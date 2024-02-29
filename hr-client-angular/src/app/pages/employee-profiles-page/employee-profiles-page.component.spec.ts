import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfilesPageComponent } from './employee-profiles-page.component';

describe('EmployeeProfilesPageComponent', () => {
  let component: EmployeeProfilesPageComponent;
  let fixture: ComponentFixture<EmployeeProfilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfilesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProfilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
