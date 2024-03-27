import { DataSource } from 'typeorm';
import { BaseRepository, PaymentData } from '../database';

export class PaymentService {
    private readonly paymentRepository;

    constructor(datasource: DataSource) {
        this.paymentRepository = new BaseRepository.default(datasource, PaymentData);
    }

    async insertRecord(payment: Partial<PaymentData>): Promise<number> {
        try {
            const { identifiers } = await this.paymentRepository.insert(payment);
            const { id } = identifiers[0]
            if (!id || +id <= 0) return 0

            return id;
        } catch (error) {
            console.log(error)
            return 0;
        }
    };

    async getRecords(page: number, size: number, dpi: string) {
        try {
            const skip = (page - 1) * size;
            const take = size;

            const { data, count } = await this.paymentRepository.findWithPagination(
                {
                    ownerDPI: dpi
                },
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