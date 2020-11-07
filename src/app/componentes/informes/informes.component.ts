import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as json2csv from 'json2csv';
import { IngresoService } from 'src/app/servicios/ingreso.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { CsvService } from 'src/app/servicios/csv.service';
import html2canvas from 'html2canvas';
import { PdfService } from 'src/app/servicios/pdf.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { DatosService } from 'src/app/servicios/datos.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  public mostrarGrafico = false;
  public informes = [];
  public seleccionado;
  public requiereHoraDia = false;

  single = [];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = false;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };



  constructor(
    private turnoService: TurnoService,
    private datosService: DatosService,
    private ingresoService: IngresoService,
    private usuarioService: UsuarioService,
    private spinnerService: SpinnerService,
    private csvService: CsvService,
    private pdf: PdfService) {
    this.informes.push({ nombre: "Días y horarios de ingreso", seleccionado: false, requiere: true, grafico: false });
    this.informes.push({ nombre: "Cantidad de operaciones por especialidad", seleccionado: false, requiere: false, grafico: true });
    this.informes.push({ nombre: "Cantidad de turnos por día", seleccionado: false, requiere: false, grafico: true });
    this.informes.push({ nombre: "Cantidad de turnos por profesional", seleccionado: false, requiere: true, grafico: true });
    this.informes.push({ nombre: "Días trabajados por profesional", seleccionado: false, requiere: true, grafico: true });
  }

  seleccionar(indice) {
    this.requiereHoraDia = this.informes[indice].requiere;
    this.informes.forEach(element => {
      element.seleccionado = false;
    });
    this.mostrarGrafico = false;
    this.informes[indice].seleccionado = true;
    this.seleccionado = this.informes[indice];
  }

  generarInforme(datos) {
    this.spinnerService.show();
    switch (this.seleccionado.nombre) {
      case "Días y horarios de ingreso":
        this.ingresoService.obtenerIngresos().subscribe((resultado) => {
          let lista = [];
          resultado.forEach(element => {
            lista.push(element.data());
          })
          let diaDesde = new Date(Date.parse(datos.diaDesde + " " + datos.horaDesde));
          let diaHasta = new Date(Date.parse(datos.diaHasta + " " + datos.horaHasta));
          lista = lista.filter(element => {
            return (element.fecha.toDate().getTime() >= diaDesde.getTime() && element.fecha.toDate().getTime() <= diaHasta.getTime());
          })
          lista = lista.map(elem => {
            return { nombre: elem.nombre, apellido: elem.apellido, fecha: elem.fecha.toDate().toLocaleString() }
          })
          this.csvService.downloadFile(lista, ['nombre', 'apellido', 'fecha']);
          this.spinnerService.hide();
        })
        break;
      case "Cantidad de operaciones por especialidad":
        // options
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Especialidad';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Turnos';
        let especialidades = [];
        let turnos = [];
        let contador = {};
        this.datosService.obtenerEspecialidades().subscribe((resultado)=>{
          resultado.forEach(el=>{
            especialidades.push(el.data().nombre);
            contador[el.data().nombre] = 0;
          });
          this.turnoService.obtenerTurnos().subscribe((turnos)=>{
            turnos.forEach((element)=>{
              if(element.data().estado != 'cancelado'){
                contador[element.data().especialidad] += 1;
              }
            });
            this.mostrarGrafico = true;
            this.single = [];
            especialidades.forEach(esp=>{
              this.single.push({"name": esp, "value": contador[esp]});
            });
            this.spinnerService.hide();
          })
        });
        break;
      case "Cantidad de turnos por día":
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Día';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Turnos';
        let diasSemana = ['L', 'M', 'X', 'J', 'V', 'S'];
        let contadorDia = {'L': 0, 'M': 0, 'X': 0, 'J': 0, 'V': 0, 'S': 0};
        this.turnoService.obtenerTurnos().subscribe((turnos)=>{
          turnos.forEach(el=>{
            if(el.data().estado != 'cancelado'){
              contadorDia[diasSemana[el.data().dia.toDate().getDay()]] += 1;
            }
          });
          this.mostrarGrafico = true;
          this.single = [];
          diasSemana.forEach(dia=>{
            this.single.push({"name": dia, "value": contadorDia[dia]});
          });
          this.spinnerService.hide();
        })
        break;
      case "Cantidad de turnos por profesional":
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Profesional';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Turnos';
        let usuarios = [];
        let contadorUsuariosTurno = {};
        let diaDesde = new Date(Date.parse(datos.diaDesde + " " + datos.horaDesde));
        let diaHasta = new Date(Date.parse(datos.diaHasta + " " + datos.horaHasta));
        this.usuarioService.obtenerUsuarios().subscribe((resultado)=>{
          resultado.forEach(el=>{
            if(el.data().role == 'profesional' && el.data().estado == 'autorizado'){
              usuarios.push({uid: el.id, nombre: el.data().nombre, apellido: el.data().apellido})
              contadorUsuariosTurno[el.id] = 0;
            }
          });
          this.turnoService.obtenerTurnos().subscribe(resultado=>{
            resultado.forEach(el=>{
              if(el.data().estado != 'cancelado'){
                let fecha = el.data().dia.toDate();
                let horas = el.data().hora.split(':');
                fecha.setHours(parseInt(horas[0]), parseInt(horas[1]));
                if(fecha.getTime()>= diaDesde.getTime() && fecha.getTime()<= diaHasta.getTime()){
                  contadorUsuariosTurno[el.data().profesional] += 1;
                }
              }
            });
            this.mostrarGrafico = true;
            this.single = [];
            usuarios.forEach(usuario=>{
              this.single.push({"name": usuario.nombre[0] + "." + usuario.apellido , "value": contadorUsuariosTurno[usuario.uid]});
            });
            this.spinnerService.hide();
          })
        })
        break;
      case "Días trabajados por profesional":
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = true;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Profesional';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'Días trabajados';
        let usuarios2 = [];
        let contadorUsuariosTurno2 = {};
        let diaDesde2 = new Date(Date.parse(datos.diaDesde + " " + datos.horaDesde));
        let diaHasta2 = new Date(Date.parse(datos.diaHasta + " " + datos.horaHasta));
        this.usuarioService.obtenerUsuarios().subscribe((resultado)=>{
          resultado.forEach(el=>{
            if(el.data().role == 'profesional' && el.data().estado == 'autorizado'){
              usuarios2.push({uid: el.id, nombre: el.data().nombre, apellido: el.data().apellido})
              contadorUsuariosTurno2[el.id] = {};
            }
          });
          this.turnoService.obtenerTurnos().subscribe(resultado=>{
            resultado.forEach(el=>{
              if(el.data().estado != 'cancelado'){
                let fecha = el.data().dia.toDate();
                let horas = el.data().hora.split(':');
                fecha.setHours(parseInt(horas[0]), parseInt(horas[1]));
                if(fecha.getTime()>= diaDesde2.getTime() && fecha.getTime()<= diaHasta2.getTime()){
                  contadorUsuariosTurno2[el.data().profesional][fecha.toLocaleDateString()] = "";
                  debugger;
                }
              }
            });
            this.mostrarGrafico = true;
            this.single = [];
            usuarios2.forEach(usuario=>{
              this.single.push({"name": usuario.nombre[0] + "." + usuario.apellido , "value": Object.keys(contadorUsuariosTurno2[usuario.uid]).length});
            });
            this.spinnerService.hide();
          })
        })
        break;
      default:
        this.spinnerService.hide();
        break;
    }

  }

  download() {
    const chart = document.getElementById('chart');
    html2canvas(chart, {
      height: 500,
      width: 1500
    }).then((canvas) => {
      const chartData = canvas.toDataURL();
      const docDefinition = { content: [] }
      docDefinition.content.push({ image: chartData, width: 1000 });
      this.pdf.downloadPdf(docDefinition);
    })
  }

  ngOnInit(): void {
  }

}
