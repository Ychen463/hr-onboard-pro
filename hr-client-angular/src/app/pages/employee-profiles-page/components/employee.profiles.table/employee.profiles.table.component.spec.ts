import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfilesTableComponent } from './employee.profiles.table.component';

describe('EmployeeProfilesTableComponent', () => {
  let component: EmployeeProfilesTableComponent;
  let fixture: ComponentFixture<EmployeeProfilesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfilesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeProfilesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
