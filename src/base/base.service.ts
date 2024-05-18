import {Logger} from '@nestjs/common';
import {BaseEntity} from './base-entity';
import {RepositoryInterface} from './repository.interface';

export abstract class BaseService<T extends BaseEntity> {
  /**
   * Repository instance for the service.
   */
  protected readonly _repository: RepositoryInterface<T>;

  /**
   * Logger instance for the service.
   */
  protected readonly _logger: Logger;

  /**
   * Constructor for the service.
   *
   * @param repository Repository instance for the service.
   */
  constructor(repository: RepositoryInterface<T>) {
    this._repository = repository;
    this._logger = new Logger(this.constructor.name);
  }
}
