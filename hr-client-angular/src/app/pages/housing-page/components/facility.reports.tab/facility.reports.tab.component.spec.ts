import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReportsTabComponent } from './facility.reports.tab.component';

describe('FacilityReportsTabComponent', () => {
  let component: FacilityReportsTabComponent;
  let fixture: ComponentFixture<FacilityReportsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityReportsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityReportsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
