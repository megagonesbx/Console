export interface ISpreadsheet {
    name: string;
    dpi: number;
    paymentMonth: number;
    id: number;
    createdAt: Date;
};

export interface IGetSpreadsheetsResponse {
    data: ISpreadsheet[];
    count: number;
    page: number;
    pages: number;
    statusCode: number;
}

export interface IGetSpreadSheet {
    spreadsheets: ISpreadsheet[];
    total: number;
    page: number;
    pages: number;
}

export interface IMonth {
    value: number;
    description: string;
}