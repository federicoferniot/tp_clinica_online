export class Review {
    public id;
    public edad;
    public temperatura;
    public detalle;
    public camposAdicionales;

    constructor(id, edad, temperatura, detalle, camposAdicionales=null){
        this.id = id;
        this.edad = edad;
        this.temperatura = temperatura;
        this.detalle = detalle;
        this.camposAdicionales = camposAdicionales;
    }
}
