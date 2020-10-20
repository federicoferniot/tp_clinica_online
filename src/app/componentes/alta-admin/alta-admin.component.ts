import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { AlertService } from 'src/app/servicios/alert.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  loading = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)],]
    })
  }

  get f() { return this.form.controls; }

  registrar(){
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.form.value.correo, this.form.value.clave)
      .then((data) => {
        let profesional = new Usuario(data.user.uid, this.form.value.nombre, this.form.value.apellido, this.form.value.correo)
        this.usuarioService.nuevoAdmin(profesional);
        this.alertService.success('Se ha creado el usuario correctamente', { keepAfterRouteChange: true });
        this.router.navigate(['/Principal']);
      })
  }

}
