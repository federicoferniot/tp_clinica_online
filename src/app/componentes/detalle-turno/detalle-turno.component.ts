import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.css']
})
export class DetalleTurnoComponent implements OnInit {
  public cargando;
  public profesionales = {};

  constructor(private usuarioService: UsuarioService) { }

  @Input() turno;
  @Output() guardarClick: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe((response)=>{
      response.forEach((el)=>{
        this.profesionales[el.id] = {
          nombre: el.data().nombre,
          apellido: el.data().apellido,
          uid: el.id,
          correo: el.data().correo
        }
      });
      this.cargando = false;
    });
  }

  guardar(){
    this.guardarClick.emit();
  }

}
