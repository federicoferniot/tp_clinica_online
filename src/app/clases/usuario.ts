export class Usuario {
    public uid;
    public nombre;
    public apellido;
    public correo;

    constructor(uid, nombre, apellido, correo){
        this.uid = uid;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
    }
}
