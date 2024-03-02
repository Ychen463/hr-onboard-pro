import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingDetailComponent } from './onboarding-detail.component';

describe('OnboardingDetailComponent', () => {
  let component: OnboardingDetailComponent;
  let fixture: ComponentFixture<OnboardingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
