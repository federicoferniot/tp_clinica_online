import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private db: AngularFirestore) { }

  nuevoTurno(turno: Turno){
    return this.db.collection('turnos').add({
      hora: turno.hora,
      profesional: turno.profesional,
      especialidad: turno.especialidad,
      paciente: turno.paciente,
      dia: turno.dia,
      duracion: turno.duracion,
      estado: 'pendiente'
    });
  }

  obtenerTurnos(){
    return this.db.collection('turnos').get();
  }

  aceptarTurno(id){
    return this.db.collection('turnos').doc(id).update({
      estado: 'aceptado'
    });
  }

  cancelarTurno(id){
    return this.db.collection('turnos').doc(id).update({
      estado: 'cancelado'
    });
  }

  finalizarTurno(id){
    return this.db.collection('turnos').doc(id).update({
      estado: 'finalizado'
    });
  }
}
