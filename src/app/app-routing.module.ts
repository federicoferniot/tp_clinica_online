import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfesionalesComponent } from './componentes/admin-profesionales/admin-profesionales.component';
import { AdministrarHorariosComponent } from './componentes/administrar-horarios/administrar-horarios.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { LoginComponent } from './componentes/login/login.component';
import { ManejarUsuarioComponent } from './componentes/manejar-usuario/manejar-usuario.component';
import { MisDatosComponent } from './componentes/mis-datos/mis-datos.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { NotificacionesComponent } from './componentes/notificaciones/notificaciones.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './servicios/auth.guard'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent},
  { path: 'Login', component: LoginComponent, data: { animation: 'Login'}},
  { path: 'Usuario', component: ManejarUsuarioComponent},
  { path: 'Principal', component: PrincipalComponent, data: { animation: 'Usuario',allowedRoles: ['admin', 'paciente', 'profesional'] }, canActivate: [AuthGuard] },
  { path: 'Paciente', component: PacienteComponent, data: { allowedRoles: ['paciente'] }, canActivate: [AuthGuard] },
  { path: 'Profesional', component: ProfesionalComponent, data: { allowedRoles: ['profesional'] }, canActivate: [AuthGuard] },
  { path: 'AdministrarProfesionales', component: AdminProfesionalesComponent, data: { allowedRoles: ['admin'] }, canActivate: [AuthGuard] },
  { path: 'AltaAdministrador', component: AltaAdminComponent, data: { allowedRoles: ['admin'] }, canActivate: [AuthGuard] },
  { path: 'PedirTurno', component: PedirTurnoComponent, data: {allowedRoles: ['paciente']}, canActivate: [AuthGuard]},
  { path: 'MisTurnos', component: MisTurnosComponent, data: {allowedRoles: ['paciente', 'profesional']}, canActivate: [AuthGuard]},
  { path: 'AdministrarHorarios', component: AdministrarHorariosComponent, data: {allowedRoles: ['profesional']}, canActivate: [AuthGuard]},
  { path: 'MisDatos', component: MisDatosComponent, data: {allowedRoles: ['paciente']}, canActivate: [AuthGuard]},
  { path: 'Notificaciones', component: NotificacionesComponent,  data: {allowedRoles: ['paciente']}, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
