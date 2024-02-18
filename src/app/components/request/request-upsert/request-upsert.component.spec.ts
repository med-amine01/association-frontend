import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestUpsertComponent} from './request-upsert.component';

describe('RequestUpsertComponent', () => {
  let component: RequestUpsertComponent;
  let fixture: ComponentFixture<RequestUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestUpsertComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RequestUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
