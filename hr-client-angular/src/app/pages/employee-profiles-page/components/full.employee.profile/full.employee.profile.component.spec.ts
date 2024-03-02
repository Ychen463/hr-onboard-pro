import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEmployeeProfileComponent } from './full.employee.profile.component';

describe('FullEmployeeProfileComponent', () => {
  let component: FullEmployeeProfileComponent;
  let fixture: ComponentFixture<FullEmployeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullEmployeeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullEmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
