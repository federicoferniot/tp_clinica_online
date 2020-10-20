import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEspecialidadesComponent } from './ver-especialidades.component';

describe('VerEspecialidadesComponent', () => {
  let component: VerEspecialidadesComponent;
  let fixture: ComponentFixture<VerEspecialidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEspecialidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEspecialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
