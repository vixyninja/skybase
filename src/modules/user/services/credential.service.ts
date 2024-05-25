import {BaseService} from '@/base';
import {MessageConstant} from '@/constants';
import {CredentialEntity} from '@/entities';
import {TokenService} from '@/token';
import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateCredentialDTO} from '../dto';
import {CredentialRepository} from '../repositories';

@Injectable()
export class CredentialService extends BaseService<CredentialEntity> {
  constructor(
    private readonly credentialRepository: CredentialRepository,
    private readonly tokenService: TokenService,
  ) {
    super(credentialRepository);
  }

  /**
   *
   * @param {string} loginName
   * @description This is method for find credential with password
   * @return {Promise<CredentialEntity>}
   */
  async findCredentialWithPassword(loginName: string): Promise<CredentialEntity> {
    try {
      const credential: CredentialEntity = await this.credentialRepository.findCredentialWithPassword({loginName});

      if (!credential) {
        throw new BadRequestException(MessageConstant.USER_NOT_FOUND);
      }

      return credential;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {string} loginName
   * @description This is method for find credential login name
   * @return {Promise<CredentialEntity>}
   */
  async findCredentialLoginName(loginName: string): Promise<CredentialEntity> {
    try {
      const credential: CredentialEntity = await this.credentialRepository.findCredentialLoginName({loginName});

      if (!credential) {
        throw new BadRequestException(MessageConstant.USER_NOT_FOUND);
      }

      return credential;
    } catch (e) {
      throw e;
    }
  }

  async createCredential({loginName, password}: CreateCredentialDTO): Promise<CredentialEntity> {
    try {
      const existCredential: CredentialEntity = await this.credentialRepository.findCredentialLoginName({loginName});

      if (existCredential) {
        throw new BadRequestException(MessageConstant.USER_EXIST);
      }

      const salt: string = await this.tokenService.generateSalt();

      if (!salt) {
        throw new BadRequestException(MessageConstant.INVALID_FIELD);
      }
      const [{privateKey, publicKey}, emailConfirmationCode, passwordResetCode, secretKey, validationCode] =
        await Promise.all([
          await this.tokenService.generateKeyPair(),
          this.tokenService.generateSecretKey(),
          this.tokenService.generateSecretKey(),
          this.tokenService.generateSecretKey(),
          this.tokenService.generateSecretKey(),
        ]);

      const credential: CredentialEntity = await this.credentialRepository.storeCredential({
        loginName: loginName,
        passwordHash: password,
        passwordSalt: salt,
        emailConfirmationCode: emailConfirmationCode,
        passwordResetCode: passwordResetCode,
        privateKey: privateKey,
        publicKey: publicKey,
        secretKey: secretKey,
        validationCode: validationCode,
      });

      if (!credential) {
        throw new BadRequestException(MessageConstant.USER_NOT_CREATED);
      }

      return credential;
    } catch (e) {
      throw e;
    }
  }
}
