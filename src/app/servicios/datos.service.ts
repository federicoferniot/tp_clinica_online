import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private db: AngularFirestore) { }

  obtenerEspecialidades(){
    return this.db.collection('especialidades').get();
  }
}
