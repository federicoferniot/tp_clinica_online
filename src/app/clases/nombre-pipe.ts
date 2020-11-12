import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "nombre"})
export class NombrePipe implements PipeTransform {
    transform(value: any, abreviado = false) {
        if(abreviado){
            return value.nombre[0] + ". " + value.apellido;
        }else{
            return value.nombre + " " + value.apellido;
        }
    }
}
