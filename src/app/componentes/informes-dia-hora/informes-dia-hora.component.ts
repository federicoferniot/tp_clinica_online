import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-informes-dia-hora',
  templateUrl: './informes-dia-hora.component.html',
  styleUrls: ['./informes-dia-hora.component.css']
})
export class InformesDiaHoraComponent implements OnInit {

  @Input() horaDia;
  @Output() generarEvent = new EventEmitter<any>();
  public diaDesde;
  public diaHasta;
  public horaDesde;
  public horaHasta;

  constructor() { }

  ngOnInit(): void {
  }

  generar(){
    this.generarEvent.emit({
      diaDesde: this.diaDesde,
      diaHasta: this.diaHasta,
      horaDesde: this.horaDesde,
      horaHasta: this.horaHasta
    })
  }

}
