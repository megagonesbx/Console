export interface IPayment {
    id?: number;
    ownerDPI: string;
    amount: number;
    month: string;
    payedAt?: string;
    description: string;
    photo?: string;
};

export interface IGetPayments {
    payments: IPayment[];
    total: number;
    page: number;
    pages: number;
};

export interface IGetPaymentsResponse {
    data: IPayment[];
    count: number;
    page: number;
    pages: number;
    statusCode: number;
};