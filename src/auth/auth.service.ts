import {ConfigsService} from '@/configs';
import {MessageConstant, VariableConstant} from '@/constants';
import {CredentialEntity, UserEntity} from '@/entities';
import {AuthFindByEnum, ProviderEnum} from '@/enums';
import {AccessTokenType, RefreshTokenType} from '@/interfaces';
import {CredentialService, UserService} from '@/modules/user/services';
import {TokenService} from '@/token';
import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {SecureConstant} from 'secure';
import {RegisterDTO} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigsService,
    private readonly credentialService: CredentialService,
  ) {}

  /**
   *
   * @param payload any
   * @returns This is method for validate token
   */
  async validation({uuid}: AccessTokenType): Promise<any> {
    try {
      if (!uuid) {
        throw new BadRequestException(MessageConstant.INVALID_UUID);
      }

      const user: UserEntity = await this.userService.findUserByType(uuid, AuthFindByEnum.UUID);

      if (!user) {
        throw new UnauthorizedException(MessageConstant.TOKEN_INVALID);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param username
   * @param password
   * @returns  This is method for authenticate user
   */
  async authenticate(username: string, password: string): Promise<any> {
    try {
      const credential: CredentialEntity = await this.credentialService.findCredentialWithPassword(username);

      const isValid = this.tokenService.comparePayload(password, credential.passwordHash);

      if (!isValid) {
        throw new UnauthorizedException(MessageConstant.EMAIL_OR_PASSWORD_INCORRECT);
      }

      const user: UserEntity = await this.userService.findUserByType(credential.uuid, AuthFindByEnum.REL_CREDENTIAL);

      const accessToken = await this.tokenService.signAsymmetricToken(
        {
          uuid: user.uuid,
        },
        SecureConstant.ACCESS_TOKEN_PRIVATE,
        {
          expiresIn: this.configService.tokenExpiresIn().accessTokenExpiresIn,
          algorithm: 'RS512',
        },
      );

      const refreshToken = await this.tokenService.signAsymmetricToken(
        {
          email: user.email,
          uuid: user.uuid,
        },
        SecureConstant.REFRESH_TOKEN_PRIVATE,
        {
          expiresIn: this.configService.tokenExpiresIn().refreshTokenExpiresIn,
          algorithm: 'RS256',
        },
      );

      if (!accessToken || !refreshToken) {
        throw new UnauthorizedException(MessageConstant.TOKEN_FAILED);
      }

      return {accessToken, refreshToken};
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param token
   * @returns This is method for refresh token
   */
  async refreshToken({client_id, device, ip, uuid}: RefreshTokenType): Promise<any> {
    try {
      const user: UserEntity = await this.userService.findUserByType(uuid, AuthFindByEnum.UUID);

      if (!user) {
        throw new UnauthorizedException(MessageConstant.TOKEN_INVALID);
      }

      const [accessToken, refreshToken] = await Promise.all([
        this.tokenService.signAsymmetricToken(
          {
            email: user.email,
            uuid: user.uuid,
          },
          SecureConstant.ACCESS_TOKEN_PRIVATE,
          {
            expiresIn: this.configService.tokenExpiresIn().accessTokenExpiresIn,
            algorithm: 'RS512',
          },
        ),
        this.tokenService.signAsymmetricToken(
          {
            uuid: uuid,
            client_id: client_id,
            device: device,
            ip: ip,
          },
          SecureConstant.REFRESH_TOKEN_PRIVATE,
          {
            expiresIn: this.configService.tokenExpiresIn().refreshTokenExpiresIn,
            algorithm: 'RS256',
          },
        ),
      ]);

      if (!accessToken || !refreshToken) {
        throw new UnauthorizedException(MessageConstant.TOKEN_FAILED);
      }

      return {accessToken, refreshToken};
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param payload RegisterDTO
   * @returns This is method for register user
   */
  async register({loginName, password}: RegisterDTO): Promise<any> {
    try {
      const user = await this.userService.createUser({
        loginName: loginName,
        password: password,
        firstName: VariableConstant.GUEST,
        lastName: VariableConstant.USER,
        provider: ProviderEnum.EMAIL,
      });

      if (!user) {
        throw new BadRequestException(MessageConstant.REGISTER_FAILED);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }
}
