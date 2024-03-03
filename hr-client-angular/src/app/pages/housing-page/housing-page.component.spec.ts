import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingPageComponent } from './housing-page.component';

describe('HousingPageComponent', () => {
  let component: HousingPageComponent;
  let fixture: ComponentFixture<HousingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
