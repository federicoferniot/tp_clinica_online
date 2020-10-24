import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { Usuario } from '../clases/usuario'
import { Paciente } from '../clases/paciente';
import { Profesional } from '../clases/profesional';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private db: AngularFirestore) { }

  obtenerUsuario(uid){
    return this.db.collection('usuarios').doc(uid).snapshotChanges();
  }

  obtenerUsuarios(){
    return this.db.collection('usuarios').get();
  }

  nuevoPaciente(usuario: Paciente){
    this.db.collection('usuarios').doc(usuario.uid).set({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      imagen1: usuario.foto1,
      imagen2: usuario.foto2,
      role: "paciente"
    })
  }

  nuevoProfesional(usuario: Profesional){
    this.db.collection('usuarios').doc(usuario.uid).set({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      especialidades: usuario.especialidades,
      role: "profesional",
      estado: "pendiente"
    })
  }

  nuevoAdmin(usuario: Usuario){
    this.db.collection('usuarios').doc(usuario.uid).set({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      role: 'admin'
    })
  }

  autorizarProfesional(usuario: Profesional){
    return this.db.collection('usuarios').doc(usuario.uid).update({
      estado: "autorizado"
    })
  }

  rechazarProfesional(usuario: Profesional){
    return this.db.collection('usuarios').doc(usuario.uid).update({
      estado: "rechazado"
    })
  }

  guardarHorarios(uid, horarios){
    return this.db.collection('usuarios').doc(uid).set({
      horarios: horarios
    }, {merge: true});
  }
}
