import {
  DataSource,
  EntityTarget,
  FindOptionsOrder,
  FindOptionsWhere,
  InsertResult,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { PaginationResult } from "../../typings";

class BaseRepository<T extends ObjectLiteral> {
  private readonly repository: Repository<T>;
  private readonly entity: EntityTarget<T>;

  constructor(datasource: DataSource, entity: EntityTarget<T>) {
    this.entity = entity;
    this.repository = datasource.getRepository(entity);
  }

  async findWithPagination(
    where: Array<FindOptionsWhere<T>> | FindOptionsWhere<T> | undefined,
    order: FindOptionsOrder<T>,
    take = 10,
    skip = 0,
    select: string[] = []
  ): Promise<PaginationResult<T>> {
    const [result, total] = await this.repository.findAndCount({
      where,
      order,
      take,
      skip,
      select,
    });

    const pageCount = Math.ceil(total / take);

    return {
      data: result,
      count: total,
      pageCount: pageCount,
      currentPage: skip / take + 1,
    };
  }

  async findOne(
    where: Array<FindOptionsWhere<T>> | FindOptionsWhere<T> | undefined,
    cache = false,
    select: string[] = []
  ) {
    const data = await this.repository.findOne({
      where,
      select,
      cache: cache,
    });

    return data;
  }

  async insert(
    records: QueryDeepPartialEntity<T> | Array<QueryDeepPartialEntity<T>>
  ) {
    const inserted: InsertResult = await this.repository.insert(records);
    return inserted;
  }

  async update(where: FindOptionsWhere<T>, record: QueryDeepPartialEntity<T>) {
    const updated: UpdateResult = await this.repository.update(where, record);
    return updated;
  }

  async delete(where: FindOptionsWhere<T>) {
    const deleted = await this.repository.delete(where);
    return deleted;
  }

  async findAll(
    where: Array<FindOptionsWhere<T>> | FindOptionsWhere<T> | undefined,
    order: FindOptionsOrder<T>,
    select: string[] = []
  ): Promise<T[]> {
    return this.repository.find({
      where,
      select,
      order,
    });
  }

  async updateMany(
    value: QueryDeepPartialEntity<T>,
    query: string,
    params: Array<FindOptionsWhere<T>> | FindOptionsWhere<T> | undefined
  ) {
    const updated: UpdateResult = await this.repository
      .createQueryBuilder()
      .update(this.entity)
      .set(value)
      .where(query, params)
      .execute();

    return updated;
  }
}

export default BaseRepository;
