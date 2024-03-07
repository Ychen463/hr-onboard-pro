import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullHousingInfoComponent } from './full.housing.info.component';

describe('FullHousingInfoComponent', () => {
  let component: FullHousingInfoComponent;
  let fixture: ComponentFixture<FullHousingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullHousingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullHousingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
