import { Usuario } from './usuario';

export class Paciente extends Usuario{
    public foto1;
    public foto2;

    constructor(uid, nombre, apellido, correo){
        super(uid, nombre, apellido, correo);
    }

    public addFoto(url){
        if(this.foto1){
            this.foto2 = url;
        }else{
            this.foto1 = url;
        }
    }
}
