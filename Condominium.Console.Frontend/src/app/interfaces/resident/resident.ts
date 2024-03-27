export interface IResident {
    id?: number;
    homeAddress: string;
    ownerName: string;
    ownerDPI: string;
    phoneNumber: string;
    solvent: boolean;
};

export interface IGetResidentsResponse {
    data: IResident[];
    count: number;
    page: number;
    pages: number;
    statusCode: number;
};