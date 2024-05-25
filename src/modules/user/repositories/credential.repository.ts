import {BaseAbstractRepository} from '@/base';
import {CredentialEntity} from '@/entities';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class CredentialRepository extends BaseAbstractRepository<CredentialEntity> {
  constructor(
    @InjectRepository(CredentialEntity)
    readonly repository: Repository<CredentialEntity>,
  ) {
    super(repository);
  }

  /**
   * @param {string} loginName
   * @description This is method for find credential with password
   * @return {Promise<CredentialEntity>}
   */
  public findCredentialWithPassword({loginName}: {loginName: string}): Promise<CredentialEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_credential')
        .addSelect('tbl_credential.password_hash')
        .where('tbl_credential.login_name = :loginName', {loginName: loginName})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} loginName
   * @description This is method for find credential login name
   * @return {Promise<CredentialEntity>}
   */
  public findCredentialLoginName({loginName}: {loginName: string}): Promise<CredentialEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_credential')
        .where('tbl_credential.login_name = :loginName', {loginName: loginName})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} uuid
   * @description This is method for find credential by uuid
   * @return {Promise<CredentialEntity>}
   */
  public findCredentialByUUID({uuid}: {uuid: string}): Promise<CredentialEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_credential')
        .where('tbl_credential.uuid = :uuid', {uuid: uuid})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} loginName
   * @param {string} passwordHash
   * @param {string} passwordSalt
   * @param {string} validationCode
   * @param {string} emailConfirmationCode
   * @param {string} passwordResetCode
   * @param {Buffer} privateKey
   * @param {Buffer} publicKey
   * @param {string} secretKey
   * @param {string} algorithm
   * @description This is method for store credential
   * @return {Promise<CredentialEntity>}
   */
  public storeCredential({
    loginName,
    passwordHash,
    passwordSalt,
    validationCode,
    emailConfirmationCode,
    passwordResetCode,
    privateKey,
    publicKey,
    secretKey,
  }: {
    loginName: string;
    passwordHash: string;
    passwordSalt: string;
    validationCode: string;
    emailConfirmationCode: string;
    passwordResetCode: string;
    privateKey: string;
    publicKey: string;
    secretKey: string;
  }): Promise<CredentialEntity> {
    return Promise.resolve(
      this._repository
        .createQueryBuilder('tbl_credential')
        .insert()
        .into(CredentialEntity)
        .values({
          loginName: loginName,
          passwordHash: passwordHash,
          passwordSalt: passwordSalt,
          validationCode: validationCode,
          emailConfirmationCode: emailConfirmationCode,
          passwordResetCode: passwordResetCode,
          privateKey: privateKey,
          publicKey: publicKey,
          secretKey: secretKey,
        })
        .execute()
        .then((result) => this.findCredentialByUUID({uuid: result.identifiers[0].uuid}))
        .catch((e) => {
          throw e;
        }),
    );
  }
}
