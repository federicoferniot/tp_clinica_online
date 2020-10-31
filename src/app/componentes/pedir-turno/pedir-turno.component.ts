import { Component, OnInit, ViewChild } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DatosService } from '../../servicios/datos.service'
import { TurnoService } from '../../servicios/turno.service'
import * as moment from 'moment';
import { Turno } from '../../clases/turno'
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/servicios/alert.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {
  public isEditable = true;
  public especialidades = [];
  private _profesionales = [];
  public profesionales = [];
  public dias;
  public profesionalesEspecialidad = [];
  public especialidadSeleccionada;
  public profesionalSeleccionado;
  public cargando;
  public cargandoProfesionales;
  public cargandoTurnos;
  public minDate: Date;
  public maxDate: Date;
  public date;
  public diaSeleccionado;
  public turnos = [];
  public _turnosAceptados = [];
  public turnosAceptados = [];
  public seBusco = false;
  private days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  public turnoSeleccionado = null;
  public siguiente = false;
  public especialidadForm: FormGroup;
  public profesionalForm: FormGroup;
  public diaForm: FormGroup;
  public turnoForm: FormGroup;

  constructor(
    private datosService: DatosService,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private turnoService: TurnoService,
    private router: Router,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder) { }

  @ViewChild('stepper') private myStepper: MatStepper;

  ngOnInit(): void {
    this.cargando = true;
    this.cargandoTurnos = true;
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() + 15);
    this.datosService.obtenerEspecialidades().subscribe((resultado) => {
      resultado.forEach((el) => {
        this.especialidades.push(el.data().nombre);
      })
      this.cargando = false;
    })
    this.usuarioService.obtenerUsuarios().subscribe((resultado) => {
      resultado.forEach((el) => {
        if (el.data().role == 'profesional' && el.data().estado == 'autorizado') {
          this._profesionales.push(new Profesional(el.id, el.data().nombre, el.data().apellido, el.data().correo, el.data().especialidades, el.data().estado, el.data().horarios))
        }
      })
      this.cargandoProfesionales = false;
    })
    this.turnoService.obtenerTurnos().subscribe((resultado) => {
      resultado.forEach((el) => {
        if (el.data().estado == 'aceptado' || el.data().estado == 'pendiente') {
          this._turnosAceptados.push(new Turno(el.id, el.data().hora, el.data().profesional, el.data().paciente, el.data().dia, el.data().especialidad, el.data().duracion, el.data().estado, el.data().tieneEncuesta));
        }
      });
      this.turnosAceptados = this._turnosAceptados;
      this.cargandoTurnos = false;
    });
    this.especialidadForm = this.formBuilder.group({
      especialidad: ['', Validators.required]
    });
    this.profesionalForm = this.formBuilder.group({
      profesional: ['', Validators.required]
    });
    this.diaForm = this.formBuilder.group({
      dia: ['', Validators.required]
    });
    this.turnoForm = this.formBuilder.group({
      turno: ['', Validators.required]
    });
  }

  filtrarProfesional() {
    let lista = [];
    lista = this._profesionales.filter((prof) => {
      let especialidades = prof.especialidades.map(element => {
        return element.especialidad;
      })
      return especialidades.includes(this.especialidadForm.value.especialidad);
    })
    this.profesionales = lista;
  }

  seleccionarEspecialidad(especialidad) {
    this.especialidadForm.setValue({
      especialidad: especialidad
    });
    this.profesionalForm.setValue({
      profesional: ''
    });
    this.profesionalSeleccionado = null;
    this.diaForm.setValue({
      dia: ''
    });
    this.date = null;
    this.diaSeleccionado = null;
    this.turnoForm.setValue({
      turno: ''
    });
    this.turnoSeleccionado = null;
    this.especialidadSeleccionada = especialidad;
    this.filtrarProfesional();
    this.myStepper.next();
  }

  filtrarDiasDisponibles() {
    let date = new Date(Date.now())
    for (let i = 0; i < 15; i++) {
      this.date = addDays(date, i);
      this.buscar();
      if (this.hayTurnosDisponibles()) {
        this.dias.push(this.date);
      }
    }
  }

  hayTurnosDisponibles() {
    return this.turnos.length > 0;
  }

  seleccionarProfesional(profesional) {
    this.profesionalForm.setValue({
      profesional: profesional
    })
    this.diaForm.setValue({
      dia: ''
    });
    this.diaSeleccionado = null;
    this.date = null;
    this.turnoForm.setValue({
      turno: ''
    });
    this.turnoSeleccionado = null;
    this.profesionalSeleccionado = profesional;
    this.dias = [];
    this.filtrarDiasDisponibles();
    this.myStepper.next();
  }

  seleccionarDia(dia) {
    this.diaForm.setValue({
      dia: dia
    });
    this.turnoForm.setValue({
      turno: ''
    });
    this.turnoSeleccionado = null;
    this.date = dia;
    this.diaSeleccionado = dia;
    this.buscar();
    this.myStepper.next();
  }

  seleccionarTurno(turno) {
    this.turnoForm.setValue({
      turno: turno
    });
    this.turnoSeleccionado = turno;
  }

  puedeBuscar() {
    return (this.especialidadSeleccionada && this.date);
  }

  filtrarTurnosAceptados() {
    if (this.profesionalSeleccionado != null) {
      this.turnosAceptados = this._turnosAceptados.filter(turnos => {
        return turnos.profesional == this.profesionalSeleccionado.uid;
      });
    }
    else {
      this.turnosAceptados = this._turnosAceptados.filter(turnos => {
        let retorno = false;
        this.profesionales.forEach(profesional => {
          if (turnos.profesional == profesional.uid) {
            retorno = true;
          }
        });
        return retorno;
      });
    }
    this.turnosAceptados = this.turnosAceptados.filter(turno => {
      return turno.dia.toDate().getTime() === this.date.getTime()
    })
  }

  buscar() {
    this.seBusco = true;
    this.turnos = [];
    let diaSemana = this.days[this.date.getDay()];
    this.filtrarTurnosAceptados();
    if (this.profesionalSeleccionado != null) {
      if (this.profesionalSeleccionado.horarios != null && this.profesionalSeleccionado.horarios[diaSemana] != null) {
        let desde = this.profesionalSeleccionado.horarios[diaSemana].horaDesde;
        let hasta = this.profesionalSeleccionado.horarios[diaSemana].horaHasta;
        let start = moment().hours(desde.split(':')[0]).minutes(desde.split(':')[1]);
        let end = moment().hours(hasta.split(':')[0]).minutes(hasta.split(':')[1]);
        let intervalo;
        this.profesionalSeleccionado.especialidades.forEach(element => {
          if (element.especialidad == this.especialidadSeleccionada) {
            intervalo = element.duracion;
          }
        });
        let turnosProfesional = [];
        while (start < end) {
          turnosProfesional.push(new Turno(null, start.format("HH:mm"), this.profesionalSeleccionado.uid, this.authService.userLoggedIn.uid, this.date, this.especialidadSeleccionada, intervalo, 'pendiente', false));
          start.add(intervalo, 'minute');
        }
        turnosProfesional = turnosProfesional.filter((turno) => {
          let turnoOcupado = false;
          this.turnosAceptados.forEach((turnoAceptado) => {
            if (turnoAceptado.profesional == turno.profesional) {
              let momentAceptadoInicio = moment().hours(turnoAceptado.hora.split(':')[0]).minutes(turnoAceptado.hora.split(':')[1]).seconds(0);
              let momentAceptadoFin = moment().hours(turnoAceptado.hora.split(':')[0]).minutes(turnoAceptado.hora.split(':')[1]).seconds(0);
              momentAceptadoFin.add(turnoAceptado.duracion, 'minute');
              let momentInicio = moment().hours(turno.hora.split(':')[0]).minutes(turno.hora.split(':')[1]).seconds(0);
              let momentFin = moment().hours(turno.hora.split(':')[0]).minutes(turno.hora.split(':')[1]).seconds(0);
              momentFin.add(turno.duracion, 'minute');
              if ((momentAceptadoInicio.isSameOrAfter(momentInicio) && momentAceptadoInicio.isSameOrBefore(momentFin)) || (momentAceptadoFin.isAfter(momentInicio) && momentAceptadoFin.isBefore(momentFin))) {
                turnoOcupado = true;
              }
            }
          });
          return !turnoOcupado;
        })
        this.turnos.push({
          profesional: this.profesionalSeleccionado,
          turnos: turnosProfesional
        });
      }
    }
    else {
      this.profesionales.forEach(prof => {
        if (prof.horarios[diaSemana] != null) {
          let desde = prof.horarios[diaSemana].horaDesde;
          let hasta = prof.horarios[diaSemana].horaHasta;
          let start = moment().hours(desde.split(':')[0]).minutes(desde.split(':')[1]);
          let end = moment().hours(hasta.split(':')[0]).minutes(hasta.split(':')[1]);
          let intervalo;
          prof.especialidades.forEach(element => {
            if (element.especialidad == this.especialidadSeleccionada) {
              intervalo = element.duracion;
            }
          });
          let turnosProfesional = [];
          while (start < end) {
            turnosProfesional.push(new Turno(null, start.format("HH:mm"), prof.uid, this.authService.userLoggedIn.uid, this.date, this.especialidadSeleccionada, intervalo, 'pendiente', false));
            start.add(intervalo, 'minute');
          }
          turnosProfesional = turnosProfesional.filter((turno) => {
            let turnoOcupado = false;
            this.turnosAceptados.forEach((turnoAceptado) => {
              if (turnoAceptado.profesional == turno.profesional) {
                debugger;
                let momentAceptadoInicio = moment().hours(turnoAceptado.hora.split(':')[0]).minutes(turnoAceptado.hora.split(':')[1]).seconds(0);
                let momentAceptadoFin = moment().hours(turnoAceptado.hora.split(':')[0]).minutes(turnoAceptado.hora.split(':')[1]).seconds(0);
                momentAceptadoFin.add(turnoAceptado.duracion, 'minute');
                let momentInicio = moment().hours(turno.hora.split(':')[0]).minutes(turno.hora.split(':')[1]).seconds(0);
                let momentFin = moment().hours(turno.hora.split(':')[0]).minutes(turno.hora.split(':')[1]).seconds(0);
                momentFin.add(turno.duracion, 'minute');
                if ((momentAceptadoInicio.isSameOrAfter(momentInicio) && momentAceptadoInicio.isSameOrBefore(momentFin)) || (momentAceptadoFin.isAfter(momentInicio) && momentAceptadoFin.isBefore(momentFin))) {
                  turnoOcupado = true;
                }
              }
            });
            return !turnoOcupado;
          })
          this.turnos.push({
            profesional: prof,
            turnos: turnosProfesional
          });
        }
      })
    }
  }

  siguientePaso() {
    console.log(this.turnoSeleccionado);
    this.siguiente = true;
  }

  guardar() {
    this.spinnerService.show();
    this.turnoService.nuevoTurno(this.turnoSeleccionado).then((res) => {
      this.cargando = false;
      this.alertService.success("Su turno ha sido solicitado", { keepAfterRouteChange: true });
      this.spinnerService.hide();
      this.router.navigate(['/Principal']);
    },
      (error) => {
        this.spinnerService.hide();
        this.cargando = false;
        this.alertService.error("Ha ocurrido un error", { keepAfterRouteChange: true });
      })
  }

}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}