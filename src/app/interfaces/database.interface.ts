import { ICase } from "../pages/databases/interfaces/Case.interface";

export interface IDatabase {
    id: string;
    belongToYear: string;
    belongToMonth: string;
    assignment: IAssignment[];
    createdAt: string;
    updatedAt: string;
};

export interface IAssignment {
    Cases: ICase[];
    CasesEnd: ICase[];
    CasesWOContactMethods: ICase[];
    Cicle: string;
    DatabaseID: IDatabase;
    PaymentPlans: IPaymentPlans;
    createdAt: string;
    isDefault: boolean
    updatedAt: string;
    _id: string;
};

export interface IPaymentPlans {
    _id: string;
    InProcessOfPayment: any[];
    Cancelled: any[];
    PlanExpired: any[];
    UncomingMaturities: any[]
}