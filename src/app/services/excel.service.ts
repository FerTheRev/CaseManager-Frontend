import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  getFile(file: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(file.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    const excel = new Promise<any>((resolve, reject) => {
      reader.onload = (e: any) => {
        // read workbook
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        // grab first sheet
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // save data
        return resolve((XLSX.utils.sheet_to_json(ws)));
      };
    })
    reader.readAsBinaryString(target.files[0]);
    return excel;
  };

  createExcel(File: any, name: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(File);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, name);

    /* save to file */
    XLSX.writeFile(wb, `${name}.xlsx`);
  };

  createCSV(file: any, name: string) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(file);
    XLSX.utils.sheet_to_csv(ws);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, name);

    /* save to file */
    XLSX.writeFile(wb, `${name}.csv`);
  }
}
