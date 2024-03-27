import { DataSource } from 'typeorm';
import { VisitorData, BaseRepository } from '../database';

export class VisitorService {
    private readonly visitorRepository;

    constructor(datasource: DataSource) {
        this.visitorRepository = new BaseRepository.default(datasource, VisitorData);
    }

    async insertRecord(visitor: Partial<VisitorData>): Promise<number> {
        try {
            const { identifiers } = await this.visitorRepository.insert(visitor);
            const { id } = identifiers[0]
            if (!id || +id <= 0) return 0

            return id;
        } catch (error) {
            return 0;
        }
    };

    async updateRecord(_id: number, visitor: Partial<VisitorData>): Promise<boolean> {
        try {
            const { id, ...visitorDB } = visitor;

            await this.visitorRepository.update({ id: _id }, visitorDB);
            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecord(id: number, select: string[] = []): Promise<VisitorData | null> {
        try {
            const visitor: VisitorData | null = await this.visitorRepository.findOne({ id }, false, select);
            if (!visitor) return null;

            return visitor;

        } catch (error) {
            return null;
        }
    };

    async deleteRecord(id: number): Promise<boolean> {
        try {
            const deleted = await this.visitorRepository.delete({ id });
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

            const { data, count } = await this.visitorRepository.findWithPagination(
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