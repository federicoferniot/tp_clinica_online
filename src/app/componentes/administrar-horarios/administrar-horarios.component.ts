import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesional } from 'src/app/clases/profesional';
import { AlertService } from 'src/app/servicios/alert.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Dia } from '../../clases/dia'

@Component({
  selector: 'app-administrar-horarios',
  templateUrl: './administrar-horarios.component.html',
  styleUrls: ['./administrar-horarios.component.css']
})
export class AdministrarHorariosComponent implements OnInit {
  public dias = [];
  private idDias = ['L', 'M', 'X', 'J', 'V', 'S'];
  public sabado = false;
  public horadesde;
  public horahasta;
  public horadesdeS;
  public horahastaS;
  public cargando = false;
  public guardado = false;
  public profesional;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.usuarioService.obtenerUsuario(this.authService.userLoggedIn.uid).subscribe((response)=>{
      let prof: any = response.payload.data();
      this.profesional = new Profesional(response.payload.id, prof.nombre, prof.apellido, prof.correo, prof.especialidades, prof.estado, prof.horarios);
      this.cargando = false;
    });
    this.idDias.forEach((dia)=>{
      this.dias.push(new Dia(dia, false));
    })
  }

  seleccionar(dia){
    dia.seleccionado = !dia.seleccionado;
    if(dia.id == "S"){
      this.sabado = dia.seleccionado;
    }
  }

  guardar(){
    this.cargando = true;
    let horario = {};
    this.dias.forEach((dia)=>{
      if(dia.seleccionado){
        if(dia.id != 'S'){
          horario[dia.id] = {
            horaDesde: this.horadesde,
            horaHasta: this.horahasta
          }
        }
        else{
          horario[dia.id] = {
            horadesde: this.horadesdeS,
            horahasta: this.horahastaS
          }
        }
      }
      else{
        horario[dia.id] = null;
      }
    })
    this.usuarioService.guardarHorarios(this.authService.userLoggedIn.uid, horario).then(()=>{
      this.cargando = false;
      this.alertService.success('Se ha guardado los horarios correctamente', { keepAfterRouteChange: true });
      this.router.navigate(['/Principal']);
    })
  }

  isCompleted(){
    if(this.isDiaSemanaSeleccionado() && this.sabado){
      return (this.horadesde != null && this.horahasta != null && this.horadesdeS != null && this.horahastaS != null);
    }
    if(this.isDiaSemanaSeleccionado() && !this.sabado){
      return (this.horadesde != null && this.horahasta != null);
    }
    if(!this.isDiaSemanaSeleccionado() && this.sabado){
      return (this.horadesdeS != null && this.horahastaS != null);
    }
    return false;
  }

  isDiaSemanaSeleccionado(){
    let retorno = false;
    this.dias.forEach(dia=>{
      if(dia.id != 'S' && dia.seleccionado){
        retorno = true;
      }
    });
    return retorno;
  }

  guardarConfig(){
    this.cargando = true;
    this.usuarioService.guardarConfiguracion(this.authService.userLoggedIn.uid, this.profesional.especialidades).then((response)=>{
      this.cargando = false;
      this.alertService.success('Se ha guardado la configuración correctamente', { keepAfterRouteChange: true });
      this.router.navigate(['/Principal']);
    })
  }

}
