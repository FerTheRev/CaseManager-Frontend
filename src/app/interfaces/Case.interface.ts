export interface ICase{
    _id?: string;
    titular: string;
    ident_tipo: string;
    ident_nro: number;
    domicilio: string;
    localidad: string;
    operador: string;
    celulares: any[];
    estado: string;
    productos: IProduct[];
    gestion: Igestion[];
    paymentPlans: any[]
}

export interface IProduct {
    producto: string;
    producto_nro: number;
    fecha_mora: string;
    monto_capital: number;
    deuda_act: number;
    acreedor: string;
    cantidad_cuotas: number;
    cuotas_Impagas: number;
    estado: string;
    acuerdo: string;
    ciclo: number;
};

export interface Igestion {
    when: number;
    event: string;
}