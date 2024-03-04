import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReportCardComponent } from './facility.report.card.component';

describe('FacilityReportCardComponent', () => {
  let component: FacilityReportCardComponent;
  let fixture: ComponentFixture<FacilityReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityReportCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
