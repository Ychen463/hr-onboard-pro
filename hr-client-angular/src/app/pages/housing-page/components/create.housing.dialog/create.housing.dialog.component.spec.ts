import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHousingDialogComponent } from './create.housing.dialog.component';

describe('CreateHousingDialogComponent', () => {
  let component: CreateHousingDialogComponent;
  let fixture: ComponentFixture<CreateHousingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHousingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateHousingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
