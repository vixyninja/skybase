import {Injectable} from '@nestjs/common';
import {UserEntity} from '../../entities';
import {UserRepository} from './user.repository';

@Injectable()
export class UserAuthService {
  constructor(private readonly repository: UserRepository) {}

  /**
   *
   * @param username
   * @description This is method for find user and return password
   * @return {Promise<UserEntity>}
   */
  async findUserWithPassword(username: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.repository.findUserWithPassword({username: username});

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param email
   * @description This is method for find user by email
   * @return {Promise<UserEntity>}
   */
  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.repository.findUserByEmail({email: email});

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param uuid
   * @description This is method for find user by uuid
   * @return {Promise<UserEntity>}
   */
  async findUserByUuid(uuid: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.repository.findUserByUuid({uuid: uuid});

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param phoneNumber
   * @description This is method for find user by phone
   * @return {Promise<UserEntity>}
   * @throws {Error}
   */
  async findUserByPhone(phoneNumber: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.repository.findUserByPhone({phoneNumber: phoneNumber});

      return user;
    } catch (e) {
      throw e;
    }
  }
}
