import {BaseService} from '@/base';
import {MessageConstant} from '@/constants';
import {UserEntity} from '@/entities';
import {AuthFindByEnum, ProviderValue} from '@/enums';
import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateUserDTO, UpdateUserDTO} from './dto';
import {UserRepository} from './user.repository';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  /**
   *
   * @param {string} val
   * @param {AuthFindByEnum} type
   * @param {boolean} withPassword
   * @description This is method for find user by type
   * @returns {Promise<UserEntity>}
   */
  async findUserByType(val: string, type: AuthFindByEnum, withPassword?: boolean): Promise<UserEntity> {
    try {
      let user: UserEntity;

      if (withPassword) {
        switch (type) {
          case AuthFindByEnum.EMAIL:
            user = await this.userRepository.findUserEmailWithPassword({email: val});
            break;
          case AuthFindByEnum.PHONE:
            user = await this.userRepository.findUserPhoneWithPassword({phoneNumber: val});
            break;
          default:
            break;
        }
      } else {
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
          default:
            break;
        }
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
  async createUser({email, firstName, lastName, password, provider}: CreateUserDTO): Promise<UserEntity> {
    try {
      const _provider = ProviderValue(provider);

      const existUser = await this.userRepository.findUserByEmail({email: email});

      if (existUser) {
        throw new BadRequestException(MessageConstant.USER_EXIST);
      }

      const user = await this.userRepository.storeUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        provider: _provider,
      });

      if (!user) {
        throw new BadRequestException(MessageConstant.USER_NOT_CREATED);
      }

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
