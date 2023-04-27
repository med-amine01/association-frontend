import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientUpsertComponent} from './patient-upsert.component';

describe('PatientUpsertComponent', () => {
  let component: PatientUpsertComponent;
  let fixture: ComponentFixture<PatientUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUpsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
