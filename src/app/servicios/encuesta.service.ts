import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private db: AngularFirestore) { }

  crearEncuesta(encuesta: Encuesta){
    return this.db.collection('encuestas').doc(encuesta.id).set({
      calificacion: encuesta.calificacion,
      limpieza: encuesta.limpieza,
      atencion: encuesta.atencion
    });
  }

  obtenerEncuesta(id){
    return this.db.collection('encuestas').doc(id).snapshotChanges();
  }
}
