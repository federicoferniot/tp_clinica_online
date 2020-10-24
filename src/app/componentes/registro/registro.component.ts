import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../servicios/alert.service';
import { AuthService } from '../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UsuarioService } from '../../servicios/usuario.service';
import { Paciente } from '../../clases/paciente'
import { Profesional } from '../../clases/profesional'
import * as firebase from 'firebase';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  public storageRef;
  public uploadTask;
  formPaciente: FormGroup;
  formProfesional: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  private file1;
  public file1Listo = false;;
  private file2;
  public file2Listo = false;
  private paciente: Paciente;
  public listaEspecialidades = ['Cardiología', 'Dermatología', 'Odontología', 'Pediatría', 'Traumatología']

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private usuarioService: UsuarioService
  ) {
    this.storageRef = firebase.storage().ref();
  }

  ngOnInit() {
    this.formPaciente = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)],],
      imagen1: ['', Validators.required],
      imagen2: ['', Validators.required]
    });
    this.formProfesional = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', [Validators.required, Validators.minLength(6)],],
      especialidades: ['', Validators.required]
    })
  }

  get f() { return this.formPaciente.controls; }

  get fP() { return this.formProfesional.controls; }

  mostrar() {
    console.log(this.formPaciente.value.imagen);
  }

  registrarPaciente() {
    this.submitted = true;

    this.alertService.clear();

    if (this.formPaciente.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.formPaciente.value.correo, this.formPaciente.value.clave)
      .then(async (data) => {
        this.paciente = new Paciente(data.user.uid, this.formPaciente.value.nombre, this.formPaciente.value.apellido, this.formPaciente.value.correo);
        this.uploadTaskAsPromise(this.file1).then(()=>{
          this.uploadTaskAsPromise(this.file2).then(()=>{
            this.usuarioService.nuevoPaciente(this.paciente);
            this.authService.sendVerificationEmail().then(()=>{
              this.alertService.success('Se ha registrado correctamente', { keepAfterRouteChange: true });
              this.router.navigate(['/Login']);
            },
            (error)=>{
              console.log(error);
            });
          });
        });
      })
      .catch(error => {
        this.alertService.error(error.message);
        console.log(error);
        this.loading = false;
      });
  }

  async uploadTaskAsPromise(imagen) {
    return new Promise((resolve, reject)=>{
      let paciente = this.paciente;
      var fotos = this.storageRef.child(ID());
      this.uploadTask = fotos.putString(imagen, 'data_url');
      this.uploadTask.on('state_changed', (snapshot) => {
  
      },
        (error) => {
  
        },
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.paciente.addFoto(downloadURL);
            resolve("Ok");
          });
        })
    })
  }

  onChange(event) {
    this.file1Listo = false;
    let reader = new FileReader();
    reader.onloadend = () => {
      this.file1 = reader.result;
      this.file1Listo = true;
    }
    reader.readAsDataURL(event.srcElement.files[0]);
  }

  onChange2(event) {
    this.file2Listo = false;
    let reader = new FileReader();
    reader.onloadend = () => {
      this.file2 = reader.result;
      this.file2Listo = true;
    }
    reader.readAsDataURL(event.srcElement.files[0]);
  }

  registrarProfesional(){
    this.submitted = true;

    this.alertService.clear();

    if (this.formProfesional.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(this.formProfesional.value.correo, this.formProfesional.value.clave)
      .then((data) => {
        let profesional = new Profesional(data.user.uid, this.formProfesional.value.nombre, this.formProfesional.value.apellido, this.formProfesional.value.correo, this.formProfesional.value.especialidades, 'pendiente', null)
        this.usuarioService.nuevoProfesional(profesional);
        this.alertService.success('Se ha registrado correctamente', { keepAfterRouteChange: true });
        this.router.navigate(['/Login']);
      })
  }

}


function ID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);

}
