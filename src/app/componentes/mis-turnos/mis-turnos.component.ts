import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { SpinnerService } from '../../servicios/spinner.service'
import { TurnoService } from 'src/app/servicios/turno.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewService } from 'src/app/servicios/review.service';
import { VerReviewComponent } from '../ver-review/ver-review.component'
import { VerEncuestaComponent } from '../ver-encuesta/ver-encuesta.component';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { NotificacionService } from '../../servicios/notificacion.service'
import { Notificacion } from 'src/app/clases/notificacion';
import { PdfService } from '../../servicios/pdf.service'

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  public busqueda;
  private _turnos = [];
  public usuarios = {};
  public cargandoTurnos = true;
  public cargandoUsuarios;
  public turnos;
  public role;
  public cargarReview;
  public turnoReview;
  public cargarEncuesta;
  public turnoEncuesta;
  public displayedColumnsProfesional: string[] = ['fecha', 'especialidad', 'paciente','estado', 'acciones'];
  public displayedColumnsPaciente: string[] = ['fecha', 'especialidad', 'profesional','estado', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private turnoService: TurnoService, private authService: AuthService, private usuarioService: UsuarioService, private snackBar: MatSnackBar,
    private spinnerService: SpinnerService,
    private dialog: MatDialog,
    private reviewService: ReviewService,
    private encuestaService: EncuestaService,
    private notificacionService: NotificacionService,
    private pdfService: PdfService) {
    this.role = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.cargandoUsuarios = true;
    this.spinnerService.show();
    this.usuarioService.obtenerUsuarios().subscribe((resultado)=>{
      resultado.forEach(el=>{
        this.usuarios[el.id] = {
          nombre: el.data().nombre,
          apellido: el.data().apellido,
          correo: el.data().correo
        }
      });
      this.turnoService.obtenerTurnos().subscribe((resultado)=>{
        resultado.forEach(el=>{
          if(this.role == 'profesional'){
            if(el.data().profesional == this.authService.userLoggedIn.uid){
              this._turnos.push(new Turno(el.id, el.data().hora, el.data().profesional, el.data().paciente, el.data().dia, el.data().especialidad, el.data().duracion, el.data().estado, el.data().tieneEncuesta, el.data().review))
            }
          }
          else{
            if(el.data().paciente == this.authService.userLoggedIn.uid){
              this._turnos.push(new Turno(el.id, el.data().hora, el.data().profesional, el.data().paciente, el.data().dia, el.data().especialidad, el.data().duracion, el.data().estado, el.data().tieneEncuesta, el.data().review))
            }
          }
        });
        this.turnos = new MatTableDataSource(this._turnos);
        this.cargandoTurnos = false;
        this.turnos.paginator = this.paginator;
        this.turnos.sort = this.sort;
        this.cargandoUsuarios = false;
        this.spinnerService.hide();
      });
    });
    
  }

  aceptar(turno){
    this.cargandoTurnos = true;
    this.spinnerService.show();
    this.turnoService.aceptarTurno(turno.id).then(response=>{
      let notificacion = new Notificacion(null, null, null, false);
      notificacion.setMensajeAceptado(turno);
      this.notificacionService.enviarNotificacion(turno.paciente, notificacion).then(()=>{
        this._turnos.forEach(el=>{
          if(el.id == turno.id){
            el.estado = 'aceptado';
          };
        });
        this.spinnerService.hide();
        this.cargandoTurnos = false;
        this.turnos = new MatTableDataSource(this._turnos);
        this.turnos.paginator = this.paginator;
        this.snackBar.open("Se ha aceptado el turno", "X", {
          duration: 3000,
          panelClass: 'notif-success'
        });
      });
    });
  }

  cancelar(turno){
    this.spinnerService.show();
    this.turnoService.cancelarTurno(turno.id).then(response=>{
      let notificacion = new Notificacion(null, null, null, false);
      notificacion.setMensajeCancelado(turno);
      this.notificacionService.enviarNotificacion(turno.paciente, notificacion).then(()=>{
        this._turnos.forEach(el=>{
          if(el.id == turno.id){
            el.estado = 'cancelado';
          };
        });
        this.cargandoTurnos = false;
        this.spinnerService.hide();
        this.turnos = new MatTableDataSource(this._turnos);
        this.turnos.paginator = this.paginator;
        this.snackBar.open("Se ha cancelado el turno", "X", {
          duration: 3000,
          panelClass: 'notif-success'
        });
      });
    })
  }

  finalizar(turno){
    this.turnoReview = turno;
    this.cargarReview = true;
  }

  completarEncuesta(turno){
    this.turnoEncuesta = turno;
    this.cargarEncuesta = true;
  }

  encuestaGuardada(){
    this.turnoService.cargarEncuesta(this.turnoEncuesta.id).then(response=>{
      this._turnos.forEach(element => {
        if(element.id == this.turnoEncuesta.id){
          element.tieneEncuesta = true
        }
      });
      this.turnos = new MatTableDataSource(this._turnos);
      this.turnos.paginator = this.paginator;
      this.spinnerService.hide();
      this.cargarEncuesta = false;
      this.turnoEncuesta = null;
      this.snackBar.open("Se ha cargado la encuesta", "X", {
        duration: 3000,
        panelClass: 'notif-success'
      });
    });
  }

  ver(turno){
    this.spinnerService.show();
    this.reviewService.obtenerReview(turno.id).subscribe((response: any)=>{
      this.spinnerService.hide();
      console.log(response.payload.data().review);
      console.log(response.payload.data())
      const dialogRef = this.dialog.open(VerReviewComponent, {
        panelClass: 'app-perfil',
        data: response.payload.data().review
      })

      dialogRef.afterClosed().subscribe( result => {
      })
    })
  }

  descargarReview(turno){
    this.spinnerService.show();
    this.reviewService.obtenerReview(turno.id).subscribe((response)=>{
      this.pdfService.generatePdfReview(this.usuarios[turno.profesional], this.usuarios[turno.paciente], response.payload.data());
      this.spinnerService.hide();
    })
  }

  verEncuesta(turno){
    this.spinnerService.show();
    this.encuestaService.obtenerEncuesta(turno.id).subscribe((response)=>{
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(VerEncuestaComponent, {
        panelClass: 'app-perfil',
        data: response.payload.data()
      })

      dialogRef.afterClosed().subscribe( result => {
      })
    })
  }

  reviewGuardada(){
    this.turnoService.cargarReview(this.turnoReview.id).then(response=>{
      this._turnos.forEach(element => {
        if(element.id == this.turnoReview.id){
          element.estado = 'finalizado'
        }
      });
      this.turnos = new MatTableDataSource(this._turnos);
      this.turnos.paginator = this.paginator;
      this.spinnerService.hide();
      this.cargarReview = false;
      this.turnoReview = null;
      this.snackBar.open("Se ha finalizado el turno y guardado la reseña", "X", {
        duration: 3000,
        panelClass: 'notif-success'
      });
    });
  }

  filtrar(){
    let listaTurnos = [];
    listaTurnos = this._turnos.filter((element)=>{
      let coincide = false;
      if(element.review){
        Object.keys(element.review).forEach(clave=>{
          if(element.review[clave].toString().includes(this.busqueda)){
            coincide = true;
          }
        });
      }
      return (this.coincideNombreApellido(this.usuarios[element.paciente]) || this.coincideNombreApellido(this.usuarios[element.profesional]) || element.especialidad.includes(this.busqueda) || coincide);
    })
    this.turnos = new MatTableDataSource(listaTurnos);
    this.cargandoTurnos = false;
    this.turnos.paginator = this.paginator;
    this.turnos.sort = this.sort;
  }

  limpiar(){
    this.busqueda = '';
    this.turnos = new MatTableDataSource(this._turnos);
    this.cargandoTurnos = false;
    this.turnos.paginator = this.paginator;
    this.turnos.sort = this.sort;
  }

  coincideNombreApellido(usuario){
    let string = usuario.nombre + " " + usuario.apellido;
    return (string.includes(this.busqueda));
  }

}
