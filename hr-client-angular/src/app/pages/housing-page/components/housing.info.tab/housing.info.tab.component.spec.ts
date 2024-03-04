import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingInfoTabComponent } from './housing.info.tab.component';

describe('HousingInfoTabComponent', () => {
  let component: HousingInfoTabComponent;
  let fixture: ComponentFixture<HousingInfoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingInfoTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
