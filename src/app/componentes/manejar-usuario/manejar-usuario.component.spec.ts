import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejarUsuarioComponent } from './manejar-usuario.component';

describe('ManejarUsuarioComponent', () => {
  let component: ManejarUsuarioComponent;
  let fixture: ComponentFixture<ManejarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManejarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManejarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
