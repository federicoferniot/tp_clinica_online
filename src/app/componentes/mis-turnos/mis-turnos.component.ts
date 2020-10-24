import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Turno } from 'src/app/clases/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  private _turnos = [];
  public usuarios = {};
  public cargandoTurnos = true;
  public cargandoUsuarios;
  public turnos;
  public role;
  public displayedColumnsProfesional: string[] = ['fecha', 'especialidad', 'paciente','estado', 'acciones'];
  public displayedColumnsPaciente: string[] = ['fecha', 'especialidad', 'profesional','estado', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private turnoService: TurnoService, private authService: AuthService, private usuarioService: UsuarioService, private snackBar: MatSnackBar) {
    this.role = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.cargandoUsuarios = true;
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
              this._turnos.push(new Turno(el.id, el.data().hora, el.data().profesional, el.data().paciente, el.data().dia, el.data().especialidad, el.data().duracion, el.data().estado))
            }
          }
          else{
            if(el.data().paciente == this.authService.userLoggedIn.uid){
              this._turnos.push(new Turno(el.id, el.data().hora, el.data().profesional, el.data().paciente, el.data().dia, el.data().especialidad, el.data().duracion, el.data().estado))
            }
          }
        });
        this.turnos = new MatTableDataSource(this._turnos);
        this.cargandoTurnos = false;
        this.turnos.paginator = this.paginator;
        this.turnos.sort = this.sort;
        this.cargandoUsuarios = false;
      });
    });
    
  }

  aceptar(turno){
    this.cargandoTurnos = true;
    this.turnoService.aceptarTurno(turno.id).then(response=>{
      this._turnos.forEach(el=>{
        if(el.id == turno.id){
          el.estado = 'aceptado';
        };
      });
      this.cargandoTurnos = false;
      this.turnos = new MatTableDataSource(this._turnos);
      this.snackBar.open("Se ha aceptado el turno", "X", {
        duration: 3000,
        panelClass: 'notif-success'
      });
    })
  }

  cancelar(turno){
    this.cargandoTurnos = true;
    this.turnoService.cancelarTurno(turno.id).then(response=>{
      this._turnos.forEach(el=>{
        if(el.id == turno.id){
          el.estado = 'cancelado';
        };
      });
      this.cargandoTurnos = false;
      this.turnos = new MatTableDataSource(this._turnos);
      this.snackBar.open("Se ha cancelado el turno", "X", {
        duration: 3000,
        panelClass: 'notif-success'
      });
    })
  }

}
