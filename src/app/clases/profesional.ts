import { Usuario } from './usuario';
import { Especialidad } from './especialidad'

export class Profesional extends Usuario{
    public especialidades: Especialidad[];
    public estado;
    public horarios;
    
    constructor(uid, nombre, apellido, correo, especialidades, estado, horarios){
        super(uid, nombre, apellido, correo);
        this.especialidades = especialidades;
        this.estado = estado;
        this.horarios = horarios;
    }
}
