import {BaseAbstractRepository} from '@/base';
import {ProviderEnum} from '@/enums';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from '../../entities';

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  /**
   * @param {string} username (email or phone number)
   * @description This is method for find user and return password
   * @return {Promise<UserEntity>}
   */
  public findUserWithPassword({username}: {username: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .addSelect('tbl_user.password')
        .where('tbl_user.email = :email', {email: username})
        .orWhere('tbl_user.phone_number = :phoneNumber', {phoneNumber: username})
        .getOne(),
    );
  }

  /**
   * @param {string} email
   * @description This is method for find user by email
   * @return {Promise<UserEntity>}
   */
  public findUserByEmail({email}: {email: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository.createQueryBuilder('tbl_user').where('tbl_user.email = :email', {email: email}).getOne(),
    );
  }

  /**
   * @param {string} uuid
   * @description This is method for find user by uuid
   * @return {Promise<UserEntity>}
   */
  public findUserByUuid({uuid}: {uuid: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository.createQueryBuilder('tbl_user').where('tbl_user.uuid = :uuid', {uuid: uuid}).getOne(),
    );
  }

  /**
   * @param {string} phone
   * @description This is method for find user by
   * @return {Promise<UserEntity>}
   */
  public findUserByPhone({phoneNumber}: {phoneNumber: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .where('tbl_user.phone_number = :phoneNumber', {phoneNumber: phoneNumber})
        .getOne(),
    );
  }

  /**
   * @param {string} uuid
   * @description This is method for find user by uuid and load relations
   * @return {Promise<UserEntity>}
   */
  public findUserWasDeleted({uuid}: {uuid: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository.createQueryBuilder('tbl_user').withDeleted().where('tbl_user.uuid = :uuid', {uuid}).getOne(),
    );
  }

  /**
   * @param {firstName: string; lastName: string; email: string; password: string; provider: ProviderEnum}
   * @description This is method for store user
   * @return {Promise<UserEntity>}
   */
  public storeUser({
    firstName,
    lastName,
    email,
    password,
    provider,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    provider: ProviderEnum;
  }): Promise<UserEntity> {
    const promise = Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .insert()
        .into(UserEntity)
        .values({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          provider: provider,
        })
        .execute(),
    );

    return promise.then((result) => this.findUserByUuid({uuid: result.identifiers[0].uuid}));
  }

  /**
   * @param {string} uuid
   * @param {Partial<{firstName: string; lastName: string; phone: string; deviceToken: string}>} param
   * @description This is method for update user
   * @return {Promise<UserEntity>}
   */
  public updateUser(
    uuid: string,
    {
      firstName,
      lastName,
      deviceToken,
      phoneNumber,
    }: Partial<{firstName: string; lastName: string; phoneNumber: string; deviceToken: string}>,
  ): Promise<UserEntity> {
    const promise = Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .update()
        .set({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          deviceToken: deviceToken,
        })
        .where('uuid = :uuid', {uuid: uuid})
        .execute()
        .then(() => this.findUserByUuid({uuid: uuid})),
    );

    return promise.then(() => this.findUserByUuid({uuid: uuid}));
  }

  /**
   * @param {string} uuid
   * @description This is method for delete user
   * @return {Promise<UserEntity>}
   */
  public deleteUser({uuid}: {uuid: string}): Promise<UserEntity> {
    const promise = Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .softDelete()
        .from(UserEntity)
        .where('uuid = :uuid', {uuid})
        .execute(),
    );

    return promise.then(() => this.findUserByUuid({uuid: uuid}));
  }
}
