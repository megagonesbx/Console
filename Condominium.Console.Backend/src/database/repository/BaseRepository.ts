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
    ) {
        const [result, total] = await this.repository.findAndCount({
            where,
            order: order,
            take,
            skip
        })

        return {
            data: result,
            count: total
        }
    }

    async findOne(
        where: Array<FindOptionsWhere<T>> | FindOptionsWhere<T> | undefined,
        order: FindOptionsOrder<T>,
        cache = false
    ) {
        const data = await this.repository.findOne({
            where,
            order,
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

    async deleteById(id: number | string) {
        const deleted = await this.repository.delete(id)
        return deleted
    }

    async getAll() {
        const allData = await this.repository.find()
        return allData
    }
}

export default BaseRepository;