import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit{
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
    })
  }

  get f() { return this.form.controls; }

  enviar(){
    if (this.form.invalid) {
      return;
    }
    return this.form.value.correo;
  }

}