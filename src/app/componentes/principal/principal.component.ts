import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { NotificacionService } from 'src/app/servicios/notificacion.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public info;
  public role;
  public notificaciones;
  public cantNoLeidas = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificacionService: NotificacionService,
    private spinnerService: SpinnerService) {
    this.info = this.authService.infoUsuario();
    this.role = this.authService.infoUsuario().role;
    if(this.role == 'paciente'){
      let cantidad = 0;
      this.spinnerService.show();
      this.notificacionService.obtenerNotificaciones(this.authService.userLoggedIn.uid).subscribe((response)=>{
        response.forEach(el=>{
          if(!el.data().leido){
            cantidad++;
          }
        });
        this.cantNoLeidas = cantidad;
        this.spinnerService.hide();
      })
    }
  }

  ngOnInit(): void {
  }
}
