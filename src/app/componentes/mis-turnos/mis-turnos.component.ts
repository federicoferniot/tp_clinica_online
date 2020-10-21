import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  private _turnos;
  public cargandoTurnos = true;
  public turnos = [{fecha: "10/10/2020 10:00", especialidad: "Traumatología", profesional: "Hector Perez", estado: "Aceptado"}];
  public displayedColumns: string[] = ['fecha', 'especialidad', 'profesional','estado', 'acciones'];

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.cargandoTurnos = false;
    }, 1000);
  }

}
