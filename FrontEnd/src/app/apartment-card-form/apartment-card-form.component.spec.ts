import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentCardFormComponent } from './apartment-card-form.component';

describe('ApartmentCardFormComponent', () => {
  let component: ApartmentCardFormComponent;
  let fixture: ComponentFixture<ApartmentCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
