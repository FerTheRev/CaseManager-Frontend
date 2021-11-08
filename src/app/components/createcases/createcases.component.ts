import { Component, OnInit } from '@angular/core';

import { IRequiredFiles } from '../../interfaces/Files.interface';
import { ICase } from '../../interfaces/Case.interface';
import { CreateCasesService } from '../../services/create-cases.service';

import { WebSocketService } from '../../services/web-socket.service';
import { ExcelService } from '../../services/excel.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WhatsappbotmainpageComponent } from '../whatsappbotmainpage/whatsappbotmainpage.component';



@Component({
  selector: 'app-createcases',
  templateUrl: './createcases.component.html',
  styleUrls: ['./createcases.component.scss']
})
export class CreatecasesComponent implements OnInit {
  RequiredFiles: IRequiredFiles = {
    assigment: [],
    cases: [],
    phones: [],
  };
  Assignment: any;
  AssignmentName: string = '';
  LoadingFile: boolean = false;
  WhatsappState: string = 'close';
  allReady: boolean = false;
  constructor(
    private CreateDBService: CreateCasesService,
    private websocketservice: WebSocketService,
    private ExcelService: ExcelService,
    private MatDialogRef: MatDialogRef<WhatsappbotmainpageComponent>,
  ) {
    this.WhatsappState = this.websocketservice.WspState
   }

  ngOnInit(): void {
    this.websocketservice.GetWspConnStatus().subscribe(WspState => {
      this.WhatsappState = WspState;
      console.log(WspState);
    })
  };

  async LoadFile(file: any, target: string) {
    const SelectedTarget: any = {
      'Asignacion': async () => {
        this.RequiredFiles.assigment = await this.ExcelService.getFile(file);
        this.AssignmentName = file.target.files[0].name;
      },
      'Casos': async () => this.RequiredFiles.cases = await this.ExcelService.getFile(file),
      'Telefonos': async () => {
        this.RequiredFiles.phones = await this.ExcelService.getFile(file);
        this.Assignment = await this.CreateDBService.getAssigment(this.RequiredFiles, this.websocketservice);
        this.allReady = true
      }
    };
    this.LoadingFile = true;
    await SelectedTarget[target]();
    this.LoadingFile = false;
    return;
  };

  CreateExcel(target: string) {
    const SelectedTarget: any = {
      'PlantillaFilomena': () => this.getFilomentaTemplate(this.Assignment.Cases),
      'Google Contacts': () => this.createGoogleContacts(this.Assignment.Cases),
    };
    SelectedTarget[target]();
  };

  private createGoogleContacts(database: ICase[]) {
    this.ExcelService.createCSV(this.getGoogleContacts(database), 'Google Contacts');
  };

  private getGoogleContacts(database: ICase[]): any[] {
    const GoogleContactsObjArr: any[] = [];
    database.forEach(Case => {
      Case.celulares.forEach((cel) => {
        const GoogleContact = {
          Nombre: Case.titular,
          Celular: cel.numero
        };
        GoogleContactsObjArr.push(GoogleContact);
      });
    });
    return GoogleContactsObjArr
  };

  private getFilomentaTemplate(database: ICase[]){
    const Cases: any[] = [];
   database.forEach(Case => {
     Case.celulares.forEach(cel => {
       let cellphoneWPrefix = cel.numero.split('');
       cellphoneWPrefix.splice(0, cel.prefijo.length + 1);
       const celular = cellphoneWPrefix.join('')
       const element = {
         trokes: Case.ident_nro,
         'Clase de Telefono (F/M)': cel.tipo,
         'Codigo de area': cel.prefijo,
         'Numero de Telefono': celular
       };
       Cases.push(element)
     })
   });

   this.ExcelService.createExcel(Cases, 'Plantilla de telefonos')
  };

  save() {
    this.CreateExcel('PlantillaFilomena');
    this.CreateExcel('Google Contacts');
    // console.log(this.AssignmentName);
    this.MatDialogRef.close({Assignment: this.Assignment, name: this.AssignmentName})
  };
}
