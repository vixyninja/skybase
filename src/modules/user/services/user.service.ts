import {BaseService} from '@/base';
import {MessageConstant} from '@/constants';
import {UserEntity} from '@/entities';
import {AuthFindByEnum} from '@/enums';
import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateUserDTO, UpdateUserDTO} from '../dto';
import {UserRepository} from '../repositories';
import {CredentialService} from './credential.service';
import {CreateCredentialDTO} from '../dto/create-credential.dto';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly credentialService: CredentialService,
  ) {
    super(userRepository);
  }

  /**
   *
   * @param {string} val
   * @param {AuthFindByEnum} type
   * @description This is method for find user by type
   * @returns {Promise<UserEntity>}
   */
  async findUserByType(val: string, type: AuthFindByEnum): Promise<UserEntity> {
    try {
      let user: UserEntity;

      switch (type) {
        case AuthFindByEnum.EMAIL:
          user = await this.userRepository.findUserByEmail({email: val});
          break;
        case AuthFindByEnum.PHONE:
          user = await this.userRepository.findUserByPhone({phoneNumber: val});
          break;
        case AuthFindByEnum.UUID:
          user = await this.userRepository.findUserByUuid({uuid: val});
          break;
        case AuthFindByEnum.REL_CREDENTIAL:
          user = await this.userRepository.findUserByCredentialUUID({uuid: val});
          break;
        default:
          throw new BadRequestException(MessageConstant.INVALID_FIELD);
      }
      if (!user) {
        throw new BadRequestException(MessageConstant.USER_NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {CreateUserDTO} dto
   * @description This is method for create user
   * @returns {Promise<UserEntity>}
   */
  async createUser({
    firstName,
    lastName,
    loginName,
    password,
  }: CreateUserDTO & CreateCredentialDTO): Promise<UserEntity> {
    try {
      const credential = await this.credentialService.createCredential({loginName, password});

      if (!credential) {
        throw new BadRequestException(MessageConstant.USER_NOT_CREATED);
      }

      const user = await this.userRepository.storeUser({
        firstName: firstName,
        lastName: lastName,
        credential: credential,
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {string} uuid
   * @description This is method for read user
   * @returns {Promise<UserEntity>}
   */
  async readUser(uuid: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findUserByUuid({uuid: uuid});

      if (!user) {
        throw new BadRequestException(MessageConstant.USER_NOT_FOUND);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {string} uuid
   * @param {UpdateUserDTO} dto
   * @description This is method for update user
   * @returns {Promise<UserEntity>}
   */
  async updateUser(uuid: string, dto: UpdateUserDTO): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findUserByUuid({uuid: uuid});

      if (!user) {
        throw new BadRequestException(MessageConstant.USER_NOT_FOUND);
      }

      const updatedUser = await this.userRepository.updateUser(uuid, dto);

      if (!updatedUser) {
        throw new BadRequestException(MessageConstant.USER_NOT_UPDATED);
      }

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {string} uuid
   * @description This is method for delete user
   * @returns {Promise<boolean>}
   */
  async deleteUser(uuid: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findUserByUuid({uuid: uuid});

      if (!user) {
        throw new BadRequestException(MessageConstant.USER_NOT_FOUND);
      }

      const deleted = await this.userRepository.deleteUser({uuid: uuid});

      if (!deleted) {
        throw new BadRequestException(MessageConstant.USER_NOT_UPDATED);
      }

      return true;
    } catch (e) {
      throw e;
    }
  }
}
