import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  pdfMake: any;
  
  constructor() { }
  
  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }
  
  async generatePdfReview(profesional, paciente, review) {
    await this.loadPdfMaker();
    let datos = [];
    datos.push(`Edad: ${review.edad}`);
    datos.push(`Temperatura: ${review.temperatura}`);
    datos.push(`Detalle: ${review.detalle}`);
    if(review.camposAdicionales){
      review.camposAdicionales.forEach(element => {
        datos.push(`${element.clave}: ${element.valor}`);
      });
    }
    const def = { content: [{ text: [{text: 'Reseña Clínica Online Ferniot Federico', style: 'header'}], style: 'texto'},{
      text: `Esta reseña ha sido cargada por el Profesional ${profesional.nombre} ${profesional.apellido}. Si tiene alguna consulta, por favor contáctese al instante en los horarios de atención. Muchas gracias.`
    , style: 'texto'},'Reseña: ', {
      ul: 
        datos
    }],
    background: {
      image: environment.logo,
      width: 400,
      height: 400,
      alignment: 'center',
      opacity: 0.5,
      margin: [0,100,0,0]
    },
    footer: { text: `Gracias por su visita ${paciente.nombre} ${paciente.apellido}`,
  style: 'footer'},
  defaultStyle: {
    fontSize: 15,
    margin: [40,40,40,40]
  },
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      alignment: 'left',
      margin: [20,20,0,0]
    },
    footer: {
      fontSize: 15,
      italics: true,
      alignment: 'right',
      margin: [0, 0, 20, 0]
    },
    text: {
      margin: [10, 10, 10, 10]
    }
  }};
    this.pdfMake.createPdf(def).download();
  }
}
