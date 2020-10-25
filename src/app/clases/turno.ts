export class Turno {
    public id;
    public hora;
    public profesional;
    public paciente;
    public dia;
    public duracion;
    public estado;
    public especialidad;
    public tieneEncuesta;

    constructor(id, hora, profesional, paciente, dia, especialidad, duracion, estado, tieneEncuesta){
        this.id = id;
        this.hora = hora;
        this.profesional = profesional;
        this.paciente = paciente;
        this.dia = dia;
        this.duracion = duracion;
        this.especialidad = especialidad;
        this.estado = estado;
        this.tieneEncuesta = tieneEncuesta;
    }
}
