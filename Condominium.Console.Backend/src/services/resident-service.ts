import { DataSource } from 'typeorm';

import { HouseData, BaseRepository } from '../database';

export class ResidentService {

    private readonly residentRepository;

    constructor(datasource: DataSource) {
        this.residentRepository = new BaseRepository.default(datasource, HouseData);
    };

    async insertRecord(house: Partial<HouseData>): Promise<number> {
        try {
            const { identifiers } = await this.residentRepository.insert(house);
            const { id } = identifiers[0]
            if (!id || +id <= 0) return 0

            return id;
        } catch (error) {
            return 0;
        }
    };

    async updateRecord(_id: number, house: Partial<HouseData>): Promise<boolean> {
        try {
            const { id, ...houseDB } = house;

            await this.residentRepository.update({ id: _id }, houseDB);
            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecord(id: number, select: string[] = []): Promise<HouseData | null> {
        try {
            const user: HouseData | null = await this.residentRepository.findOne({ id }, false, select);
            if (!user) return null;

            return user;

        } catch (error) {
            return null;
        }
    };

    async deleteRecord(id: number): Promise<boolean> {
        try {
            const deleted = await this.residentRepository.delete({ id: id });
            if (!deleted || deleted.affected == 0) return false;

            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecords(dpi: number, page: number, size: number) {
        try {
            const skip = (page - 1) * size;
            const take = size;
            let where = {};

            if (dpi > 0) {
                where = { ownerDPI: dpi }
            }

            const { data, count } = await this.residentRepository.findWithPagination(
                where,
                {
                    id: 'DESC'
                },
                take,
                skip,
                ["id", "homeAddress", "ownerName", "ownerDPI", "phoneNumber", "solvent"]);

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

    async setSolventResident(id: number): Promise<boolean> {
        try {
            await this.residentRepository.update({ id }, { solvent: true });
            return true;
        } catch (error) {
            return false;
        };
    };

    async resetSolvent(): Promise<boolean> {
        try {
            await this.residentRepository.update({}, { solvent: false });
            return true;
        } catch (error) {
            return false;
        };
    };
};