import {BaseService} from '@/base';
import {UserEntity} from '@/entities';
import {ProviderEnum} from '@/enums';
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
   * @param {CreateUserDTO} dto
   * @description This is method for create user
   * @returns {Promise<UserEntity>}
   */
  async createUser(dto: CreateUserDTO): Promise<UserEntity> {
    try {
      const {email, firstName, lastName, password, provider} = dto;

      let _provider: ProviderEnum = ProviderEnum.UNKNOWN;

      switch (provider) {
        case ProviderEnum.GOOGLE:
          _provider = ProviderEnum.GOOGLE;
          break;
        case ProviderEnum.EMAIL:
          _provider = ProviderEnum.EMAIL;
          break;
        default:
          _provider = ProviderEnum.UNKNOWN;
          break;
      }

      const user = await this.userRepository.storeUser({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        provider: _provider,
      });

      if (!user) throw new BadRequestException('User not created');

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

      if (!user) throw new BadRequestException('User not found');

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

      if (!user) throw new BadRequestException('User not found');

      const updatedUser = await this.userRepository.updateUser(uuid, dto);

      if (!updatedUser) throw new BadRequestException('User not updated');

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

      if (!user) throw new BadRequestException('User not found');

      const deleted = await this.userRepository.deleteUser({uuid: uuid});

      if (!deleted) throw new BadRequestException('User not deleted');

      return true;
    } catch (e) {
      throw e;
    }
  }
}
