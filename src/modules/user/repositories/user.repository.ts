import {BaseAbstractRepository} from '@/base';
import {CredentialEntity, UserEntity} from '@/entities';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
  /**
   * @param {string} email
   * @description This is method for find user by email
   * @return {Promise<UserEntity>}
   */
  public findUserByEmail({email}: {email: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .where('tbl_user.email = :email', {email: email})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} uuid
   * @description This is method for find user by uuid
   * @return {Promise<UserEntity>}
   */
  public findUserByUuid({uuid}: {uuid: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .where('tbl_user.uuid = :uuid', {uuid: uuid})
        .getOne()
        .catch((e) => {
          throw e;
        }),
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
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} uuid
   * @description This is method for find user by uuid and load relations
   * @return {Promise<UserEntity>}
   */
  public findUserByCredentialUUID({uuid}: {uuid: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .leftJoinAndSelect('tbl_user.credential', 'tbl_credential')
        .where('tbl_credential.uuid = :uuid', {uuid})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} uuid
   * @description This is method for find user by uuid and load relations
   * @return {Promise<UserEntity>}
   */
  public findUserWasDeleted({uuid}: {uuid: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .withDeleted()
        .where('tbl_user.uuid = :uuid', {uuid})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {firstName: string; lastName: string, credential: CredentialEntity}
   * @description This is method for store user
   * @return {Promise<UserEntity>}
   */
  public storeUser({
    firstName,
    lastName,
    credential,
  }: {
    firstName: string;
    lastName: string;
    credential: CredentialEntity;
  }): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .insert()
        .into(UserEntity)
        .values({
          firstName: firstName,
          lastName: lastName,
          credential: credential,
        })
        .execute()
        .then((result) => this.findUserByUuid({uuid: result.identifiers[0].uuid}))
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} uuid
   * @param {Partial<{firstName: string; lastName: string; phone: string; deviceToken: string}>} param
   * @description This is method for update user
   * @return {Promise<UserEntity>}
   */
  public updateUser(
    uuid: string,
    {firstName, lastName, phoneNumber}: Partial<{firstName: string; lastName: string; phoneNumber: string}>,
  ): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .update()
        .set({
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        })
        .where('uuid = :uuid', {uuid: uuid})
        .execute()
        .then(() => this.findUserByUuid({uuid: uuid}))
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} uuid
   * @description This is method for delete user
   * @return {Promise<UserEntity>}
   */
  public deleteUser({uuid}: {uuid: string}): Promise<boolean> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .softDelete()
        .from(UserEntity)
        .where('uuid = :uuid', {uuid})
        .execute()
        .then((result) => result.affected > 0)
        .catch((e) => {
          throw e;
        }),
    );
  }
}
