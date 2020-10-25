export class Encuesta {
    public id;
    public calificacion;
    public limpieza;
    public atencion;

    constructor(id, calificacion, limpieza, atencion){
        this.id = id;
        this.calificacion = calificacion;
        this.limpieza = limpieza;
        this.atencion = atencion;
    }
}
