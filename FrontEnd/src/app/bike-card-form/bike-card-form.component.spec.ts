import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeCardFormComponent } from './bike-card-form.component';

describe('BikeCardFormComponent', () => {
  let component: BikeCardFormComponent;
  let fixture: ComponentFixture<BikeCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
