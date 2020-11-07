export class Review {
    public id;
    public Edad;
    public Temperatura;
    public Detalle;
    public CamposAdicionales;

    constructor(id, edad, temperatura, detalle, camposAdicionales=null){
        this.id = id;
        this.Edad = edad;
        this.Temperatura = temperatura;
        this.Detalle = detalle;
        this.CamposAdicionales = camposAdicionales;
    }
}
