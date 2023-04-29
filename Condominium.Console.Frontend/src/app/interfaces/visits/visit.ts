export interface Ivisit {
    id: number;
    name: string;
    dpi: number;
    homeAddress: string;
    createdAt?: string;
}

export interface IGetVisitorsResponse {
    data: Ivisit[];
    count: number;
    page: number;
    pages: number;
    statusCode: number;
};

export interface IGetVisitors {
    visitors: Ivisit[];
    total: number;
    page: number;
    pages: number;
};