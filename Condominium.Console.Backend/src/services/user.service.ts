import { DataSource } from 'typeorm';

import { UserData, BaseRepository } from '../database';

export class UserService {
    private readonly userRepository;

    constructor(datasource: DataSource) {
        this.userRepository = new BaseRepository.default(datasource, UserData);
    }

    async insertRecord(report: Partial<UserData>): Promise<number> {
        try {
            const { identifiers } = await this.userRepository.insert(report);
            const { id } = identifiers[0]
            if (!id || +id <= 0) return 0

            return id;
        } catch (error) {
            return 0;
        }
    }
};