import { DataSource } from 'typeorm';
import { UserData, BaseRepository } from '../database';

export class AuthService {
    private readonly authRepository;

    constructor(datasource: DataSource) {
        this.authRepository = new BaseRepository.default(datasource, UserData);
    };

    async getRecord(email: string): Promise<string | null> {
        try {
            const user: UserData | null = await this.authRepository.findOne({ Email: email });
            if (!user) return null;

            return user.Password;
        } catch (error) {
            return null;
        }
    };
};