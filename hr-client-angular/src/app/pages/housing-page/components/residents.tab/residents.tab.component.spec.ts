import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsTabComponent } from './residents.tab.component';

describe('ResidentsTabComponent', () => {
  let component: ResidentsTabComponent;
  let fixture: ComponentFixture<ResidentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentsTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
