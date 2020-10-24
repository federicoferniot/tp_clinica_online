import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/clases/profesional';
import { AlertService } from 'src/app/servicios/alert.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VerEspecialidadesComponent } from '../ver-especialidades/ver-especialidades.component';

@Component({
  selector: 'app-admin-profesionales',
  templateUrl: './admin-profesionales.component.html',
  styleUrls: ['./admin-profesionales.component.css']
})
export class AdminProfesionalesComponent implements OnInit {
  private _profesionales;
  private _listProfesionales: Profesional[];
  public cargandoProfesionales = true;
  public profesionales;
  public displayedColumns: string[] = ['nombre', 'apellido', 'especialidades','correo','estado', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private usuarioService: UsuarioService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe((response) => {
      this._profesionales = [];
      response.forEach(el => {
        if (el.data().role == 'profesional') {
          this._profesionales.push(new Profesional(el.id, el.data().nombre, el.data().apellido, el.data().correo, el.data().especialidades, el.data().estado, el.data().horarios));
        }
      });
      this.profesionales = new MatTableDataSource(this._profesionales);
      this.cargandoProfesionales = false;
      this.profesionales.paginator = this.paginator;
    })

  }

  openDialog(especialidades){
    const dialogRef = this.dialog.open(VerEspecialidadesComponent, {
      panelClass: 'app-perfil',
      data: especialidades
    })

    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
    })
  }

  autorizar(profesional){
    this.cargandoProfesionales = true;
    this.usuarioService.autorizarProfesional(profesional).then((result)=>{
      this.snackBar.open("Se ha autorizado el usuario", "X", {
        duration: 3000,
        panelClass: 'notif-success'
      });
      this._profesionales.forEach(element => {
        if(element.uid == profesional.uid){
          element.estado = "autorizado"
        }
      });
      this.profesionales = new MatTableDataSource(this._profesionales);
      this.cargandoProfesionales = false;
    },
    (error)=>{
      this.snackBar.open("Ha ocurrido un error", "X", {
        duration: 3000,
        panelClass: 'notif-warn'
      });
      this.cargandoProfesionales = false;
    })
  }

  rechazar(profesional){
    this.cargandoProfesionales = true;
    this.usuarioService.rechazarProfesional(profesional).then((result)=>{
      this.snackBar.open("Se ha rechazado el usuario", "X", {
        duration: 3000,
        panelClass: 'notif-success'
      });
      this._profesionales.forEach(element => {
        if(element.uid == profesional.uid){
          element.estado = "rechazado"
        }
      });
      this.profesionales = new MatTableDataSource(this._profesionales);
      this.cargandoProfesionales = false;
    },
    (error)=>{
      this.snackBar.open("Ha ocurrido un error", "X", {
        duration: 3000,
        panelClass: 'notif-warn'
      });
      this.cargandoProfesionales = false;
    })

  }

}
