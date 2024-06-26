import { DataSource } from 'typeorm';

import { SpreadsheetData, BaseRepository } from '../database';

export class SpreadsheetService {
    private readonly spreadsheetRepository;

    constructor(datasource: DataSource) {
        this.spreadsheetRepository = new BaseRepository.default(datasource, SpreadsheetData);
    };

    async insertRecord(spreadsheet: Partial<SpreadsheetData>): Promise<number> {
        try {
            const { identifiers } = await this.spreadsheetRepository.insert(spreadsheet);

            const { Id } = identifiers[0]
            if (!Id || +Id <= 0) return 0;

            return Id;
        } catch (error: any) {
            return 0;
        };
    };

    async updateRecord(_id: number, _spreadsheet: Partial<SpreadsheetData>): Promise<boolean> {
        try {
            const { Id, ...spreadsheet } = _spreadsheet;

            await this.spreadsheetRepository.update({ Id: _id }, spreadsheet);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    };

    async getRecord(id: number) {
        try {
            const spreadsheet: SpreadsheetData | null = await this.spreadsheetRepository.findOne({ Id: id });
            return (!spreadsheet) ? null : spreadsheet;
        } catch (error) {
            return null;
        }
    };

    async deleteRecord(id: number): Promise<boolean> {
        try {
            const deleted = await this.spreadsheetRepository.delete({ Id: id });
            return (!deleted || deleted.affected == 0) ? false : true;
        } catch (error) {
            return false;
        }
    };

    async getRecords(page: number, size: number, dpi?: number) {
        try {
            const skip = (page - 1) * size;
            const take = size;
            let where = {};

            if (dpi && dpi > 0) {
                where = { DPI: dpi }
            }

            const { data, count } = await this.spreadsheetRepository.findWithPagination(
                where,
                {
                    Id: 'DESC'
                },
                take,
                skip
            );

            const pagination = {
                data: data,
                totalItems: count,
                currentPage: page,
                totalPages: Math.ceil(count / size)
            };

            return pagination;
        } catch (error) {
            throw error;
        }
    };
};