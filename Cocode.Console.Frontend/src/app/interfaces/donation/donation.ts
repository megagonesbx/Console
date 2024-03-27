export interface IDonation {
    id?: number;
    quantity: number;
    donationPhoto: string;
    description: string;
    utilization: string;
}

export interface IGetDonationsResponse {
    data: IDonation[];
    count: number;
    page: number;
    pages: number;
    statusCode: number;
}