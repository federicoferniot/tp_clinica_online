import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { AuthService } from '../../servicios/auth.service';
import { AlertService } from '../../servicios/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { RecuperarComponent } from '../recuperar/recuperar.component';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    public dialog: MatDialog,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.form.value.correo, this.form.value.clave).then(res => {
      this.usuarioService.obtenerUsuario(this.authService.userLoggedIn.uid).subscribe(resultado => {
        this.authService.setUserInfo(resultado.payload.data());
        switch (this.authService.getUserRole()) {
          case 'paciente':
            if (!this.authService.userLoggedIn.emailVerified) {
              this.alertService.error("No se ha verificado el correo. Por favor revise su casilla de correo")
              this.authService.logout();
              this.router.navigate(['/Login']);
              this.loading = false;
            }
            else {
              this.router.navigate(['/Principal']);
            }
            break;
          case 'profesional':
            if (this.authService.infoUsuario().estado == 'pendiente') {
              this.alertService.error("Su usuario no ha sido autorizado por el administrador. Por favor espere a ser autorizado")
              this.authService.logout();
              this.router.navigate(['/Login']);
              this.loading = false;
            }
            else if (this.authService.infoUsuario().estado == 'rechazado') {
              this.alertService.error("Su usuario ha sido rechazado")
              this.authService.logout();
              this.router.navigate(['/Login']);
              this.loading = false;
            }
            else {
              this.router.navigate(['/Principal'])
            }
            break;
          case 'admin':
            this.router.navigate(['Principal']);
            break;
          default:
            this.alertService.error("Hubo un error. Por favor intente más tarde")
            break;
        }
      });
    })
      .catch(error => {
        console.log(error);
        this.alertService.error(error);
        this.loading = false;
      });
  }

  precargarUsuario(usuario) {
    switch (usuario) {
      case 'paciente':
        this.form.setValue({
          correo: "feder.fer.93@gmail.com",
          clave: "fedezxr37"
        });
        break;
      case 'admin':
        this.form.setValue({
          correo: "admin@mail.com",
          clave: "123456"
        });
        break;
      case 'profesional':
        this.form.setValue({
          correo: "profesional1@mail.com",
          clave: "123456"
        });
        break;

      default:
        break;
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(RecuperarComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.sendPasswordResetEmail(result).then(res => {
          this.alertService.success("Se envió el mail")
        })
          .catch(error => {
            this.alertService.error(error.message);
          });
      }
    });
  }
}
