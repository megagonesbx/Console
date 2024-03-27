import { DataSource } from 'typeorm';
import { IncidentData, BaseRepository } from '../database';

export class IncidentService {
    private readonly incidentRepository;

    constructor(datasource: DataSource) {
        this.incidentRepository = new BaseRepository.default(datasource, IncidentData);
    }

    async insertRecord(report: Partial<IncidentData>): Promise<number> {
        try {
            const { identifiers } = await this.incidentRepository.insert(report);
            const { id } = identifiers[0]
            if (!id || +id <= 0) return 0

            return id;
        } catch (error) {
            return 0;
        }
    };

    async updateRecord(_id: number, report: Partial<IncidentData>): Promise<boolean> {
        try {
            const { id, ...reportDB } = report;

            await this.incidentRepository.update({ id: _id }, reportDB);
            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecord(id: number, select: string[] = []): Promise<IncidentData | null> {
        try {
            const report: IncidentData | null = await this.incidentRepository.findOne({ id }, false, select);
            if (!report) return null;

            return report;

        } catch (error) {
            return null;
        }
    };

    async deleteRecord(id: number): Promise<boolean> {
        try {
            const deleted = await this.incidentRepository.delete({ id });
            if (!deleted || deleted.affected == 0) return false;

            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecords(page: number, size: number) {
        try {
            const skip = (page - 1) * size;
            const take = size;

            const { data, count } = await this.incidentRepository.findWithPagination(
                {},
                {
                    id: 'DESC'
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