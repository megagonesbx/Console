import { DataSource } from 'typeorm';

import { UserData, BaseRepository } from '../database';

export class UserService {
    private readonly userRepository;

    constructor(datasource: DataSource) {
        this.userRepository = new BaseRepository.default(datasource, UserData);
    }

    async insertRecord(user: Partial<UserData>): Promise<number> {
        try {
            const { identifiers } = await this.userRepository.insert(user);
            const { id } = identifiers[0]
            if (!id || +id <= 0) return 0

            return id;
        } catch (error) {
            return 0;
        }
    }

    async updateRecord(id: number, user: Partial<UserData>): Promise<boolean> {
        try {
            await this.userRepository.update({ id }, user);
            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecordById(id: number) {
        try {
            const userDB : UserData | null = await this.userRepository.findOne({ id });
            if (!userDB) return null;

            const { Password, ...user } = userDB;

            return user;
            
        } catch (error) {
            return null;
        }
    };
};