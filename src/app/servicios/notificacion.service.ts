import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notificacion } from '../clases/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private db: AngularFirestore) { }

  enviarNotificacion(uid, notificacion: Notificacion){
    return this.db.collection('usuarios').doc(uid).collection('notificaciones').add({
      fecha: new Date(Date.now()),
      asunto: notificacion.asunto,
      mensaje: notificacion.mensaje,
      leido: false
    });
  }

  obtenerNotificaciones(uid){
    return this.db.collection('usuarios').doc(uid).collection('notificaciones').get();
  }

  leerNotificacion(uid, notificacion: Notificacion){
    console.log(uid);
    console.log(notificacion);
    return this.db.collection('usuarios').doc(uid).collection('notificaciones').doc(notificacion.id).update({
      leido: true
    });
  }

  eliminarNotificacion(uid, notificacion: Notificacion){
    return this.db.collection('usuarios').doc(uid).collection('notificaciones').doc(notificacion.id).delete();
  }
}
