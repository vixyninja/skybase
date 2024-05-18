import {DeepPartial, FindManyOptions, FindOneOptions, Repository, SaveOptions} from 'typeorm';
import {BaseEntity} from './base-entity';
import {RepositoryInterface} from './repository.interface';

export abstract class BaseAbstractRepository<T extends BaseEntity> implements RepositoryInterface<T> {
  /**
   * @field _repository Repository<T>
   * @description This is field for entity
   */
  protected _repository: Repository<T>;

  /**
   *
   * @param entity Repository<T>
   * @description This is constructor for BaseAbstractRepository
   */
  constructor(entity: Repository<T>) {
    this._repository = entity;
  }

  /**
   *
   * @param data DeepPartial<T>
   * @description This is method for create entity
   */
  public create(data: DeepPartial<T>): Promise<T> {
    return this._repository.save(data);
  }

  /**
   *
   * @param data DeepPartial<T>[]
   * @description This is method for create many entities
   */
  public createMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this._repository.save(data);
  }

  /**
   *
   * @param data T
   * @param options SaveOptions
   * @description This is method for save entity
   */
  public save(data: T, options?: SaveOptions): Promise<T> {
    return this._repository.save(data, options);
  }

  /**
   *
   * @param data T[]
   * @param options SaveOptions
   * @description This is method for save many entities
   */
  public saveMany(data: T[], options?: SaveOptions): Promise<T[]> {
    return this._repository.save(data, options);
  }

  /**
   *
   * @param options FindOneOptions<T>
   * @description This is method for find entity by conditions
   */
  public findOne(options: FindOneOptions<T>): Promise<T> {
    return this._repository.findOne(options);
  }

  /**
   *
   * @param conditions FindOneOptions<T>
   * @description This is method for find entity by conditions
   */
  public findOneByConditions(conditions: FindOneOptions<T>): Promise<T> {
    return this._repository.findOne(conditions);
  }

  /**
   *
   * @param options FindManyOptions<T>
   * @description This is method for find all entities
   */
  public findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this._repository.find(options);
  }

  /**
   *
   * @param relations FindManyOptions<T>
   * @description This is method for find all entities with relations
   */
  public findWithRelations(relations: FindManyOptions<T>): Promise<T[]> {
    return this._repository.find(relations);
  }

  /**
   *
   * @param data DeepPartial<T>
   * @description This is method for update entity
   */
  public preload(entityLike: DeepPartial<T>): Promise<T> {
    return this._repository.preload(entityLike);
  }

  /**
   *
   * @param data T
   * @description This is method for delete entity
   */
  public softDelete(data: T): Promise<T> {
    return this._repository.softRemove(data);
  }
}
