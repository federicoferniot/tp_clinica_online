import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/servicios/alert.service';
import { AuthService } from 'src/app/servicios/auth.service';
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

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
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

  isCompletedConfig(){
    return false;
  }

  guardarConfig(){

  }

}
