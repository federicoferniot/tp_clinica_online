import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularFireModule } from "@angular/fire";
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecuperarComponent } from './componentes/recuperar/recuperar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { AlertComponent } from './componentes/alert/alert.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { ManejarUsuarioComponent } from './componentes/manejar-usuario/manejar-usuario.component';
import { AdminProfesionalesComponent } from './componentes/admin-profesionales/admin-profesionales.component';
import { VerEspecialidadesComponent } from './componentes/ver-especialidades/ver-especialidades.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { MisDatosComponent } from './componentes/mis-datos/mis-datos.component';
import { AdministrarHorariosComponent } from './componentes/administrar-horarios/administrar-horarios.component';

var firebaseConfig = {
  apiKey: "AIzaSyBKpKdgLpf92eV9Uv6xRywYHf-gu3E-_-k",
  authDomain: "clinica-2729c.firebaseapp.com",
  databaseURL: "https://clinica-2729c.firebaseio.com",
  projectId: "clinica-2729c",
  storageBucket: "clinica-2729c.appspot.com",
  messagingSenderId: "7269000435",
  appId: "1:7269000435:web:04de23b33f4bfd0941c386"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarComponent,
    PrincipalComponent,
    PacienteComponent,
    ProfesionalComponent,
    AlertComponent,
    RegistroComponent,
    MenuComponent,
    MisTurnosComponent,
    PedirTurnoComponent,
    ManejarUsuarioComponent,
    AdminProfesionalesComponent,
    VerEspecialidadesComponent,
    AltaAdminComponent,
    MisDatosComponent,
    AdministrarHorariosComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
