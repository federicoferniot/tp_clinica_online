import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../clases/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private db: AngularFirestore) { }

  crearReview(review: Review){
    return this.db.collection('turnos').doc(review.id).update({
      review: this.convertToObject(review),
    });
  }

  convertToObject(review){
    let objeto = {};
    objeto['edad'] = review.edad;
    objeto['temperatura'] = review.temperatura;
    objeto['detalle'] = review.detalle;
    review.camposAdicionales.forEach(element => {
      objeto[element.clave] = element.valor;
    });
    return objeto;
  }

  obtenerReview(id){
    return this.db.collection('turnos').doc(id).snapshotChanges();
  }
}
