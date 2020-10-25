import { Turno } from './turno';

export class Notificacion {
    public id;
    public asunto;
    public mensaje;
    public leido;

    constructor(id, asunto, mensaje, leido){
        this.id = id;
        this.asunto = asunto;
        this.mensaje = mensaje;
        this.leido = leido;
    }

    setMensajeCancelado(turno: Turno){
        this.asunto = "Turno cancelado";
        this.mensaje = `Su turno del día ${turno.dia.toDate().toLocaleDateString()} a las ${turno.hora}hs ha sido cancelado`;
    }

    setMensajeAceptado(turno: Turno){
        this.asunto = "Turno aceptado"
        this.mensaje = `Su turno del día ${turno.dia.toDate().toLocaleDateString()} a las ${turno.hora}hs ha sido aceptado`;
    }
}
