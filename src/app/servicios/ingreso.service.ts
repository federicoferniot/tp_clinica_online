import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private db: AngularFirestore) { }

  guardarIngreso(nombre, apellido, uid){
    return this.db.collection('ingresos').add({
      nombre: nombre,
      apellido: apellido,
      uid: uid,
      fecha: new Date(Date.now())
    });
  }

  obtenerIngresos(){
    return this.db.collection('ingresos').get();
  }
}
