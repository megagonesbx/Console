export interface IPayment {
    id?: number;
    month: string;
    amount: number;
    photo?: string;
    userId?: number;
    payedAt?: string;
    description: string;
}

export interface IGetPayments {
    payments: IPayment[];
    total: number;
    page: number;
    pages: number;
}

export interface IGetPaymentsResponse {
    data: IPayment[];
    count: number;
    page: number;
    pages: number;
    statusCode: number;
}
