import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../servicios/review.service'
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { Review } from 'src/app/clases/review';

@Component({
  selector: 'app-cargar-review',
  templateUrl: './cargar-review.component.html',
  styleUrls: ['./cargar-review.component.css']
})
export class CargarReviewComponent implements OnInit {
  
  public form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private reviewService: ReviewService) { }

  @Input() turno;
  @Output() guardarReview: EventEmitter<any> = new EventEmitter();
    
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      edad: ['', Validators.required],
      temperatura: ['', Validators.required],
      detalle: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  guardar(){
    this.spinnerService.show();
    this.reviewService.crearReview(new Review(this.turno.id, this.form.value.edad, this.form.value.temperatura, this.form.value.detalle))
    .then(response=>{
      this.guardarReview.emit();
    });
  }

}
