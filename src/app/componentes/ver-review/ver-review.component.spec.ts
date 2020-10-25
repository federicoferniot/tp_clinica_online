import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerReviewComponent } from './ver-review.component';

describe('VerReviewComponent', () => {
  let component: VerReviewComponent;
  let fixture: ComponentFixture<VerReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
