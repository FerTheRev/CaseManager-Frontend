export interface ICasePaymentPlan {
    Caseid: string;
    PaymentPlans: IPlan[];
    ident_nro: number;
    ident_tipo: string;
    titular: string
};

export interface IPlan {
    ExpiredIn: string;
    banco: string;
    deuda_act: string;
    fecha_mora: string;
    honorarios: string;
    montoCuota: string;
    monto_capital: string;
    montoTotal: string;
    plan: number;
    producto: string;
    producto_nro: number;
};
