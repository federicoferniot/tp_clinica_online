import { Injectable } from '@angular/core';
import * as json2csv from 'json2csv';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  Json2csvParser = json2csv.Parser;
  constructor() { }

  public downloadFile(data: any, fields, filename?: string) {
    let csvData = this.convertToCSV(data, fields);
    let file = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(file, "data.csv");
  }

  public convertToCSV(objArray: any, fields) {
    let json2csvParser = new this.Json2csvParser({ fields });
    let csv = json2csvParser.parse(objArray);
    return csv;
  }
}
