import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingSummaryViewComponent } from './housing.summary.view.component';

describe('HousingSummaryViewComponent', () => {
  let component: HousingSummaryViewComponent;
  let fixture: ComponentFixture<HousingSummaryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingSummaryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingSummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
