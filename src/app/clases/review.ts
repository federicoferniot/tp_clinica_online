export class Review {
    public id;
    public edad;
    public temperatura;
    public presion;
    public detalle;
    public camposAdicionales;

    constructor(id, edad, temperatura, presion, detalle, camposAdicionales=null){
        this.id = id;
        this.edad = edad;
        this.temperatura = temperatura;
        this.presion = presion;
        this.detalle = detalle;
        this.camposAdicionales = camposAdicionales;
    }
}
