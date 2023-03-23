import { DataSource } from 'typeorm';
import { UserData, BaseRepository } from '../database';

export class AuthService {
    private readonly authRepository;

    constructor(datasource: DataSource) {
        this.authRepository = new BaseRepository.default(datasource, UserData);
    };

    async getRecord(email: string): Promise<{ Password: string, id: number } | null> {
        try {
            const user: { Password: string, id: number } | null = await this.authRepository.findOne({ Email: email }, false, ["Password", "id"]);
            if (!user) return null;

            return user;
        } catch (error) {
            return null;
        }
    };
};