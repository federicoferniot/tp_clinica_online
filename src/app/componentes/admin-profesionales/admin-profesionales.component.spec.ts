import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfesionalesComponent } from './admin-profesionales.component';

describe('AdminProfesionalesComponent', () => {
  let component: AdminProfesionalesComponent;
  let fixture: ComponentFixture<AdminProfesionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfesionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
