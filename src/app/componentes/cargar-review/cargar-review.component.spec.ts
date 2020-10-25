import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarReviewComponent } from './cargar-review.component';

describe('CargarReviewComponent', () => {
  let component: CargarReviewComponent;
  let fixture: ComponentFixture<CargarReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
