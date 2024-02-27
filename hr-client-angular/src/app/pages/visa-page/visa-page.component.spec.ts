import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaPageComponent } from './visa-page.component';

describe('VisaPageComponent', () => {
  let component: VisaPageComponent;
  let fixture: ComponentFixture<VisaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
