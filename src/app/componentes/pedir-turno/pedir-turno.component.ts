import { Component, OnInit } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { DatosService } from '../../servicios/datos.service'

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {
  public especialidades = [];
  public profesionales = [];
  public cargando;
  public cargandoProfesionales;
  public minDate: Date;
  public maxDate: Date;

  constructor(
    private datosService: DatosService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.minDate = new Date(Date.now());
    this.maxDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() + 15);
    this.datosService.obtenerEspecialidades().subscribe((resultado) => {
      resultado.forEach((el) => {
        this.especialidades.push(el.data().nombre);
      })
      this.cargando = false;
    })
    this.usuarioService.obtenerUsuarios().subscribe((resultado)=>{
      resultado.forEach((el)=>{
        if(el.data().role == 'profesional' && el.data().estado == 'autorizado'){
          this.profesionales.push( new Profesional(el.id, el.data().nombre, el.data().apellido, el.data().correo, el.data().especialidades, el.data().estado))
        }
      })
      this.cargandoProfesionales = false;
    })
  }

}
