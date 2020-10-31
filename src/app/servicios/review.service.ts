import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from '../clases/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private db: AngularFirestore) { }

  crearReview(review: Review){
    return this.db.collection('reviews').doc(review.id).set({
      edad: review.edad,
      temperatura: review.temperatura,
      detalle: review.detalle,
      camposAdicionales: review.camposAdicionales
    });
  }

  obtenerReview(id){
    return this.db.collection('reviews').doc(id).snapshotChanges();
  }
}
