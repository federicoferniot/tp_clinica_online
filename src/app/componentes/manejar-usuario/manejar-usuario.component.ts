import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../servicios/alert.service';
import { AuthService } from '../../servicios/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-manejar-usuario',
  templateUrl: './manejar-usuario.component.html',
  styleUrls: ['./manejar-usuario.component.css']
})
export class ManejarUsuarioComponent implements OnInit {

  ngUnsubscribe: Subject<any> = new Subject<any>();
  actions;

  // The user management actoin to be completed
  mode: string;
  // Just a code Firebase uses to prove that
  // this is a real password reset.
  actionCode: string;

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  actionCodeChecked;
  form: FormGroup;
  submitted = false;
  codigoCorrecto = false;
  verificando = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      clave: ['', [Validators.required, Validators.minLength(6)]],
      claveRepetida: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(params => {
        if (!params) this.router.navigate(['/home']);

        this.mode = params['mode'];
        this.actionCode = params['oobCode'];

        console.log(params['mode'])
        switch (params['mode']) {
          case 'resetPassword': {
            // Verify the password reset code is valid.
            this.authService.getAuth().verifyPasswordResetCode(this.actionCode).then(response => {
              this.actionCodeChecked = true;
            }).catch(error => {
              this.router.navigate(['/Error']);
            });
          } break;
          case 'verifyEmail': {
            this.authService.getAuth().applyActionCode(this.actionCode).then(()=>{
              this.codigoCorrecto = true;
              this.verificando = false;
            },
            (error)=>{
              this.codigoCorrecto = false;
              this.verificando = false;
            });
          } break;
          default: {
            console.log('query parameters are missing');
            this.router.navigate(['/Login']);
          }
        }
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get f() { return this.form.controls; }

  handleResetPassword() {
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
    }
    if (this.form.value.clave != this.form.value.claveRepetida) {
      this.alertService.error('Las claves no coinciden');;
      return;
    }
    this.authService.getAuth().confirmPasswordReset(
      this.actionCode,
      this.form.value.clave
    )
      .then(resp => {
        this.alertService.success('Se ha cambiado la clave correctamente', { keepAfterRouteChange: true });
        this.router.navigate(['/Login']);
      }).catch(e => {
        this.router.navigate(['/Error']);
      });
  }
}
