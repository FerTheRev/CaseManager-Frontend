import { Injectable } from '@angular/core';
import { prefijos } from './prefijos';

import { ICGPhonesFile, ICGCasesFile, IRequiredFiles } from '../interfaces/Files.interface';
import { ICase } from '../interfaces/Case.interface';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class CreateCasesService {
  private prefijos: string[] = prefijos.map(el => el.toString());
  constructor() {
  }

  async getAssigment(files: IRequiredFiles, ws: Socket) {
    return await this.getCases(files, ws);
  };

  private async getCases(files: IRequiredFiles, ws: Socket) {
    const Cases: ICase[] = [];
    const dontHaveCases: any[] = [];
    const dontHavePhones: any[] = [];

    //Empieza proceso de generar deudores con sus casos
    // files.assigment.forEach(debtor => {
    //   Sacar casos de cada deudor

    // });
    for await (const debtor of files.assigment){
      const casesFromCG = files.cases.filter(Case => Case.nro_doc === debtor.Documento);
      const RawPhones = files.phones.filter(phones => phones.DOCUMENTO === debtor.Documento && phones.DATO === 'TEL');

      if (casesFromCG.length > 0) {
        const debtorCases: ICase = {
          titular: casesFromCG[0].nombre,
          ident_tipo: casesFromCG[0].tipo_doc,
          ident_nro: casesFromCG[0].nro_doc,
          domicilio: casesFromCG[0].domicilio,
          localidad: casesFromCG[0].localidad,
          estado: 'SIN GESTION',
          operador: 'Judith Larrosa',
          celulares: await this.FormatPhones(RawPhones, ws),
          // celulares: RawPhones.map(e => e.DETALLE),
          productos: this.getCasesFromCG(casesFromCG),
          gestion: [],
          paymentPlans: []
        };
        const validating = Cases.find(el => el.ident_nro === debtorCases.ident_nro);

        if (!validating && debtorCases.celulares.length > 0) Cases.push(debtorCases);

        if (debtorCases.celulares.length === 0) {
          debtorCases.estado = 'EN PROCESO DE LOCALIZACION'
          const debtor = debtorCases;
          dontHavePhones.push(debtor)
        };

      } else {//si no tiene casos
        const debtorWOCases = {
          dni: debtor.Documento,
          titular: debtor.Titular
        };
        dontHaveCases.push(debtorWOCases);
      }
    }
    //Termina proceso de generar deudores con sus casos
    return {
      Cases,
      dontHavePhones,
      dontHaveCases
    };
  };

  private getCasesFromCG(casesCG: ICGCasesFile[]) {
    const Cases = casesCG.filter(el => el.estado !== 'No gestionar').map(Case => {
      return {
        producto: Case.producto,
        producto_nro: Case.operacion,
        fecha_mora: Case.fecha_atraso,
        monto_capital: Case.deuda_capital,
        deuda_act: Case.deuda_total,
        acreedor: 'ICBC',
        cantidad_cuotas: Case.cant_cuotas,
        cuotas_Impagas: 0,
        estado: Case.estado,
        acuerdo: Case.acuerdo,
        ciclo: Case.ciclo
      }
    })
    return Cases;
  };

  private async FormatPhones(Phones: ICGPhonesFile[], ws: Socket): Promise<any[]> {
    const phones: any[] = [];

    const step1 = Phones.map(el => el.DETALLE.toString().split('(')[0].trim().split(' ').join(''));

    step1.forEach(cel => {
      let phone: string = '';
      // SI EL TELEFONO EMPIEZA EN 15 ES UN CELULAR
      if (cel.startsWith('15')) {
        const replacing15 = cel.split('');
        replacing15.splice(0, 2, '1', '1');
        phone = replacing15.join('');
        const CellPhone = {
          numero: phone,
          tipo: 'M',
          prefijo: '11'
        };
        const validating = phones.find((f: any) => f.numero === CellPhone.numero);
        if (!validating && phone.length === 10) phones.push(CellPhone);
      };
      // SI EL TELEFONO EMPIEZA CON UN PREFIJO + 15, ES UN CELULAR
      this.prefijos.forEach(prefix => {
        if (cel.startsWith(`${prefix}15`)) {
          const deleting15 = cel.split('');
          deleting15.splice(prefix.length, 2)
          phone = deleting15.join('');
          const CellPhone = {
            numero: phone,
            tipo: 'M',
            prefijo: prefix
          };

          const validating = phones.find((f: any) => f.numero === CellPhone.numero);
          if (!validating && phone.length === 10) phones.push(CellPhone);
        };
        // SI EL TELEFONO EMPIEZA CON UN PREFIJO Y TIENE 10 NUMEROS, POSIBLEMENTE ES UN CELULAR
        if (cel.startsWith(prefix) && cel.length === 10) {
          // phone = cel;
          const CellPhone = {
            numero: phone,
            tipo: 'M',
            prefijo: prefix
          }
          const validating = phones.find((f: any) => f.numero === CellPhone.numero);
          if (!validating && phone.length === 10) phones.push(CellPhone);
        };
      });

    });

    return this.VerifyWspNumbers(phones, ws)
  };

  private  VerifyWspNumbers(phones: any[], ws: Socket) {
    const wspPromise = new Promise<any>( (resolve) => {
      ws.emit('create new task', {taskType: 'Verificar numeros en Wsp', phones});
      ws.fromEvent('Phones Verified').subscribe(obs => {
        if (obs) {
          return resolve(obs)
        }
      })
    });

    return wspPromise;
  }
}
