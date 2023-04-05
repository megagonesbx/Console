import { DataSource } from 'typeorm';

import { DonationsData, BaseRepository } from '../database';

export class DonationService {
    private readonly donationRepository;

    constructor(datasource: DataSource) {
        this.donationRepository = new BaseRepository.default(datasource, DonationsData);
    };

    async insertRecord(donation: Partial<DonationsData>): Promise<number> {
        try {
            const { identifiers } = await this.donationRepository.insert(donation);
            const { id } = identifiers[0]
            if (!id || +id <= 0) return 0

            return id;
        } catch (error) {
            console.log(error);
            return 0;
        }
    };

    async updateRecord(_id: number, _donation: Partial<DonationsData>): Promise<boolean> {
        try {
            const { id, ...donation } = _donation;

            await this.donationRepository.update({ id: _id }, donation);
            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecord(id: number) {
        try {
            const user: DonationsData | null = await this.donationRepository.findOne({ id });
            if (!user) return null;

            return user;
        } catch (error) {
            return null;
        }
    };

    async deleteRecord(id: number): Promise<boolean> {
        try {
            const deleted = await this.donationRepository.delete({ id });
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

            const { data, count } = await this.donationRepository.findWithPagination(
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