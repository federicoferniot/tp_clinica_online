import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-cargar-encuesta',
  templateUrl: './cargar-encuesta.component.html',
  styleUrls: ['./cargar-encuesta.component.css']
})
export class CargarEncuestaComponent implements OnInit {

  public form: FormGroup;
  loading = false;
  submitted = false;
  public limpiezaSeleccionado;

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private encuestaService: EncuestaService) { }

  @Input() turno;
  @Output() guardarEncuesta: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      calificacion: ['', Validators.required],
      limpieza: ['', Validators.required],
      atencion: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  guardar(){
    this.spinnerService.show();
    this.encuestaService.crearEncuesta(new Encuesta(this.turno.id, this.form.value.calificacion, this.form.value.limpieza, this.form.value.atencion))
    .then(response=>{
      this.guardarEncuesta.emit();
    });
  }

}
