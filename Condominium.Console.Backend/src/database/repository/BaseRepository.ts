import {
    DataSource,
    EntityTarget,
    FindOptionsOrder,
    FindOptionsWhere,
    InsertResult,
    ObjectLiteral,
    Repository,
    UpdateResult
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { PaginationResult } from '../../typings';

class BaseRepository<T extends ObjectLiteral> {
    private readonly repository: Repository<T>

    constructor(datasource: DataSource, entity: EntityTarget<T>) {
        this.repository = datasource.getRepository(entity)
    }

    async findWithPagination(
        where: Array<FindOptionsWhere<T>> | FindOptionsWhere<T> | undefined,
        order: FindOptionsOrder<T>,
        take = 10,
        skip = 0
    ): Promise<PaginationResult<T>> {
        const [result, total] = await this.repository.findAndCount({
            where,
            order,
            take,
            skip
        });

        const pageCount = Math.ceil(total / take);

        return {
            data: result,
            count: total,
            pageCount: pageCount,
            currentPage: skip / take + 1
        };
    }

    async findOne(
        where: Array<FindOptionsWhere<T>> | FindOptionsWhere<T> | undefined,
        cache = false
    ) {
        const data = await this.repository.findOne({
            where,
            cache: cache
        })

        return data
    }

    async insert(records: QueryDeepPartialEntity<T> | Array<QueryDeepPartialEntity<T>>) {
        const inserted: InsertResult = await this.repository.insert(records)
        return inserted
    }

    async update(where: FindOptionsWhere<T>, record: QueryDeepPartialEntity<T>) {
        const updated: UpdateResult = await this.repository.update(where, record)
        return updated
    }

    async delete(where: FindOptionsWhere<T>) {
        const deleted = await this.repository.delete(where)
        return deleted;
    }
}

export default BaseRepository;