import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectFeedbackDialogComponent } from './reject-feedback-dialog.component';

describe('RejectFeedbackDialogComponent', () => {
  let component: RejectFeedbackDialogComponent;
  let fixture: ComponentFixture<RejectFeedbackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectFeedbackDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectFeedbackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
