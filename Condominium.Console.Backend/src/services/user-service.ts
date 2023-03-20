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

    async updateRecord(_id: number, user: Partial<UserData>): Promise<boolean> {
        try {
            const { id, ...userDB } = user;

            await this.userRepository.update({ id: _id }, userDB);
            return true;
        } catch (error) {
            return false;
        }
    };

    async getRecord(id: number) {
        try {
            const user : UserData | null = await this.userRepository.findOne({ id });
            if (!user) return null;

            return user;

        } catch (error) {
            return null;
        }
    };

    async deleteRecord(id: number): Promise<boolean> {
        try {
            const deleted = await this.userRepository.delete({ id: id });
            if (!deleted || deleted.affected == 0) return false;

            return true;
        } catch (error) {
            return false;
        }
    };

};