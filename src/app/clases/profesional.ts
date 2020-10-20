import { Usuario } from './usuario';

export class Profesional extends Usuario{
    public especialidades;
    public estado;
    
    constructor(uid, nombre, apellido, correo, especialidades, estado){
        super(uid, nombre, apellido, correo);
        this.especialidades = especialidades;
        this.estado = estado;
    }
}
