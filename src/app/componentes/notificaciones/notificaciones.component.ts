import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Notificacion } from 'src/app/clases/notificacion';
import { AuthService } from 'src/app/servicios/auth.service';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { VerNotificacionComponent } from '../ver-notificacion/ver-notificacion.component';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  private _notificaciones;
  private _listNotificaciones: Notificacion[];
  public cargando = true;
  public notificaciones;
  public displayedColumns: string[] = ['asunto', 'acciones'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private notificacionService: NotificacionService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  cantidad(){
    return this._listNotificaciones.length;
  }

  ngOnInit(): void {
    this.cargando = true;
    this.spinnerService.show();
    this.notificacionService.obtenerNotificaciones(this.authService.userLoggedIn.uid).subscribe((response) => {
      this._listNotificaciones = [];
      response.forEach(el => {
        this._listNotificaciones.push(new Notificacion(el.id, el.data().asunto, el.data().mensaje, el.data().leido));
      });
      this.notificaciones = new MatTableDataSource(this._listNotificaciones);
      this.cargando = false;
      this.notificaciones.sort = this.sort;
      this.notificaciones.paginator = this.paginator;
      this.spinnerService.hide();
    },
      (error) => {
        console.log(error);
        this.spinnerService.hide();
      })
  }

  ver(elemento) {
    this.spinnerService.show();
    this.notificacionService.leerNotificacion(this.authService.userLoggedIn.uid, elemento).then(() => {
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(VerNotificacionComponent, {
        panelClass: 'app-perfil',
        data: elemento
      });

      dialogRef.afterClosed().subscribe(result => {
        this._listNotificaciones.forEach(el => {
          if (el.id == elemento.id) {
            el.leido = true;
          }
        });
        this.notificaciones = new MatTableDataSource(this._listNotificaciones);
        this.notificaciones.sort = this.sort;
        this.notificaciones.paginator = this.paginator;
      })
    })

  }

  eliminar(elemento) {
    this.spinnerService.show();
    this.notificacionService.eliminarNotificacion(this.authService.userLoggedIn.uid, elemento).then(() => {
      this._listNotificaciones = this._listNotificaciones.filter(el => {
        if (el.id == elemento.id) {
          return false;
        }
        return true;
      });
      this.spinnerService.hide();
      this.snackBar.open("Se ha eliminado la notificación", "X", {
        duration: 3000,
        panelClass: 'notif-success'
      });
      this.notificaciones = new MatTableDataSource(this._listNotificaciones);
      this.notificaciones.sort = this.sort;
      this.notificaciones.paginator = this.paginator;
    })
  }

}
