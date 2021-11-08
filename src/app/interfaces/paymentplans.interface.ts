import { ICasePaymentPlan } from "./casepaymentplan.interface";

export interface IPaymentPlans {
    Cancelled: ICasePaymentPlan[];
    InProcessOfPayment: ICasePaymentPlan[];
    PlanExpired: ICasePaymentPlan[];
    UncomingMaturities: ICasePaymentPlan[];
    _id: string;
}