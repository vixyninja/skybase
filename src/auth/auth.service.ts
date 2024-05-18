import {ConfigsService} from '@/configs';
import {JWT_CONSTANT, MessageConstant, VariableConstant} from '@/constants';
import {UserEntity} from '@/entities';
import {ProviderEnum} from '@/enums';
import {AccessTokenType, RefreshTokenType} from '@/interfaces';
import {UserAuthService, UserService} from '@/modules/user';
import {compareHash} from '@/utils';
import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {generateFromEmail} from 'unique-username-generator';
import {RegisterDTO} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.sign(
          {
            email: user.email,
            uuid: user.uuid,
          },
          {
            algorithm: 'RS512',
            privateKey: JWT_CONSTANT.ACCESS_TOKEN_KEY_PAIR.access_token_private_key_content,
            expiresIn: '1h',
          },
        ),
        this.jwtService.signAsync(
          {
            email: user.email,
            uuid: user.uuid,
          },
          {
            algorithm: 'RS256',
            privateKey: JWT_CONSTANT.REFRESH_TOKEN_KEY_PAIR.refresh_token_private_key_content,
            expiresIn: '3h',
          },
        ),
      ]);

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
        this.jwtService.sign(
          {
            client_id: client_id,
            uuid: user.uuid,
          },
          {
            algorithm: 'RS512',
            encoding: 'base64url',
            privateKey: this.configService.jwtSecret().privateKey,
            expiresIn: this.configService.tokenExpiresIn().accessTokenExpiresIn,
          },
        ),
        this.jwtService.sign(
          {
            uuid: uuid,
            client_id: client_id,
            device: device,
            ip: ip,
          },
          {
            algorithm: 'RS256',
            encoding: 'base64url',
            privateKey: this.configService.jwtSecret().privateKey,
            expiresIn: this.configService.tokenExpiresIn().refreshTokenExpiresIn,
          },
        ),
      ]);

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
