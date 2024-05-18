import {DeepPartial, FindManyOptions, FindOneOptions, SaveOptions} from 'typeorm';
import {BaseEntity} from './base-entity';
import {ExecuteQueryResult} from './type';

export abstract class RepositoryInterface<T extends BaseEntity> {
  /**
   *
   * @param data DeepPartial<T>
   * @description This is method for create entity
   */
  abstract create(data: DeepPartial<T>): ExecuteQueryResult<T>;

  /**
   *
   * @param data DeepPartial<T>[]
   * @description This is method for create many entities
   */
  abstract createMany(data: DeepPartial<T>[]): ExecuteQueryResult<T[]>;

  /**
   *
   * @param data T
   * @param options SaveOptions
   * @description This is method for save entity
   */
  abstract save(data: T, options?: SaveOptions): ExecuteQueryResult<T>;

  /**
   *
   * @param data T[]
   * @param options SaveOptions
   * @description This is method for save many entities
   */
  abstract saveMany(data: T[], options?: SaveOptions): ExecuteQueryResult<T[]>;

  /**
   *
   * @param data T
   * @description This is method for update entity
   */
  abstract findOne(options: FindOneOptions<T>): ExecuteQueryResult<T>;

  /**
   *
   * @param conditions FindOneOptions<T>
   * @description This is method for find entity by conditions
   */
  abstract findOneByConditions(conditions: FindOneOptions<T>): ExecuteQueryResult<T>;

  /**
   *
   * @param options FindManyOptions<T>
   * @description This is method for find all entities
   */
  abstract findAll(options?: FindManyOptions<T>): ExecuteQueryResult<T[]>;

  /**
   *
   * @param relations FindManyOptions<T>
   * @description This is method for find all entities with relations
   */
  abstract findWithRelations(relations: FindManyOptions<T>): ExecuteQueryResult<T[]>;

  /**
   *
   * @param entityLike DeepPartial<T>
   * @description This is method for preload entity
   */
  abstract preload(entityLike: DeepPartial<T>): ExecuteQueryResult<T>;

  /**
   *
   * @param data T
   * @description This is method for delete entity
   */
  abstract softDelete(data: T): ExecuteQueryResult<T>;
}
