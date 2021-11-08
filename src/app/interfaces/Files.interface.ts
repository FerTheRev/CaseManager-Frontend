export interface ICGPhonesFile {
    TIPO: string;
    DOCUMENTO: number;
    DATO: string;
    DETALLE: string;
    FECHA: string;
};

export interface ICGCasesFile {
    segmento: string;
    producto: string;
    operacion: number;
    nombre: string;
    tipo_doc: string;
    nro_doc: number;
    domicilio: string;
    localidad: string;
    codigo_postal: number;
    telefono: number;
    fecha_apertura: string;
    moneda: number;
    cant_cuotas: number;
    sucursal: number;
    fecha_atraso: string;
    dias_atraso: number;
    fecha_castigo: string;
    deuda_total: number;
    monto_castigo: number;
    deuda_capital: number;
    deuda_activa: number;
    fecha_ult_pago: string;
    estado: string;
    estudio: string;
    fecha_asignacion: string;
    ciclo: number;
    acuerdo: string;
    reingreso_en_tramite: string;
    demanda_de_terceros: string;
    concurso: string;
    quiebra: string;
    demanda: string;
    importe_tasacion: number;
};

export interface IAssignmentFile {
    Documento: number;
    'Deuda Remitida': number;
    'Deuda Historica': number;
    Seguro: string;
    Titular: string;
    Acreedor: string;
    Status: string;
    SubStatus: string;
    'Fecha Ult. Tel.': string;
    'Fecha Ult. Pago': string;
    'Fecha Compromiso': string;
    'Fecha de Alta': string;
    'Prox. Acción': string;
    'Fecha Prx. Acc.': string;
    Evento_Subevento: string;
    'Ultima Gestión': string;
    Cuotas_Impagas: number;
    'Gestor Prejudicial': string
};

export interface IRequiredFiles {
    assigment: IAssignmentFile[],
    cases: ICGCasesFile[],
    phones: ICGPhonesFile[];
}