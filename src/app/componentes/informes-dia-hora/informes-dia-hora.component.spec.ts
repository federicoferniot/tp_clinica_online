import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesDiaHoraComponent } from './informes-dia-hora.component';

describe('InformesDiaHoraComponent', () => {
  let component: InformesDiaHoraComponent;
  let fixture: ComponentFixture<InformesDiaHoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesDiaHoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesDiaHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
