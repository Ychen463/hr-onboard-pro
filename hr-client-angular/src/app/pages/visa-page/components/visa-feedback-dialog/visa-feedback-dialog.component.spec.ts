import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaFeedbackDialogComponent } from './visa-feedback-dialog.component';

describe('VisaFeedbackDialogComponent', () => {
  let component: VisaFeedbackDialogComponent;
  let fixture: ComponentFixture<VisaFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaFeedbackDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
