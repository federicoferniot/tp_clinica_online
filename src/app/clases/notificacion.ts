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
}
