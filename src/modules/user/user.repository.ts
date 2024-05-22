import {BaseAbstractRepository} from '@/base';
import {UserEntity} from '@/entities';
import {ProviderEnum} from '@/enums';
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
   * @param {string} username (email or phone number)
   * @description This is method for find user and return password
   * @return {Promise<UserEntity>}
   */
  public findUserEmailWithPassword({email}: {email: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .addSelect('tbl_user.password')
        .where('tbl_user.email = :email', {email: email})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} phoneNumber
   * @description This is method for find user and return password
   * @return {Promise<UserEntity>}
   */
  public findUserPhoneWithPassword({phoneNumber}: {phoneNumber: string}): Promise<UserEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_user')
        .addSelect('tbl_user.password')
        .where('tbl_user.phone_number = :phoneNumber', {phoneNumber: phoneNumber})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
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
    return Promise.resolve(
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
    {
      firstName,
      lastName,
      deviceToken,
      phoneNumber,
    }: Partial<{firstName: string; lastName: string; phoneNumber: string; deviceToken: string}>,
  ): Promise<UserEntity> {
    return Promise.resolve(
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
