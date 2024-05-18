import {ConfigsService} from '@/configs';
import {MessageConstant, VariableConstant} from '@/constants';
import {UserEntity} from '@/entities';
import {ProviderEnum} from '@/enums';
import {AccessTokenType, RefreshTokenType} from '@/interfaces';
import {UserAuthService, UserService} from '@/modules/user';
import {TokenService} from '@/token';
import {compareHash} from '@/utils';
import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {generateFromEmail} from 'unique-username-generator';
import {RegisterDTO} from './dto';
import {SecureConstant} from 'secure';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigsService,
  ) {}

  /**
   *
   * @param payload any
   * @returns This is method for validate token
   */
  async validation({uuid}: AccessTokenType): Promise<any> {
    try {
      const user: UserEntity = await this.userAuthService.findUserByUuid(uuid);

      if (!uuid || !user) {
        throw new UnauthorizedException(MessageConstant.TOKEN_INVALID);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param email
   * @param password
   * @returns  This is method for authenticate user
   */
  async authenticate(email: string, password: string): Promise<any> {
    try {
      const user = await this.userAuthService.findUserWithPassword(email);

      const isValid = compareHash(password, user.password);

      if (!isValid || !user) {
        throw new UnauthorizedException(MessageConstant.EMAIL_OR_PASSWORD_INCORRECT);
      }

      // const [accessToken, refreshToken] = await Promise.all([
      //   this.tokenService.signAsymmetricToken(
      //     {
      //       email: user.email,
      //       uuid: user.uuid,
      //     },
      //     {
      //       expiresIn: this.configService.tokenExpiresIn().accessTokenExpiresIn,
      //     },
      //   ),
      //   this.tokenService.signAsymmetricToken(
      //     {
      //       email: user.email,
      //       uuid: user.uuid,
      //     },
      //     {
      //       expiresIn: this.configService.tokenExpiresIn().refreshTokenExpiresIn,
      //     },
      //   ),
      // ]);

      const accessToken = await this.tokenService.signAsymmetricToken(
        {
          email: user.email,
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
      const user: UserEntity = await this.userAuthService.findUserByUuid(uuid);

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
  async register({email, password}: RegisterDTO): Promise<any> {
    try {
      const uniqueName = generateFromEmail(email, 9);

      const user = await this.userService.createUser({
        email: email,
        password: password,
        firstName: VariableConstant.GUEST,
        lastName: uniqueName,
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
