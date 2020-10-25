import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Notificacion } from '../clases/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private db: AngularFirestore) { }

  enviarNotificacion(uid, notificacion: Notificacion){
    
  }
}
