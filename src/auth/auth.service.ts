import {JWT_CONSTANT} from '@/constants';
import {ProviderEnum} from '@/enums';
import {CredentialNotCorrectException} from '@/exceptions';
import {UserAuthService, UserService} from '@/modules/user';
import {compareHash} from '@/utils';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {generateFromEmail} from 'unique-username-generator';
import {RegisterDTO} from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param payload any
   * @returns This is method for validate token
   */
  async validation(payload: any): Promise<any> {
    try {
      const {uuid}: any = payload;

      if (!uuid) throw new UnauthorizedException('Invalid token');

      return await this.userAuthService.findUserByUuid(uuid);
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

      if (!user) throw new CredentialNotCorrectException();

      const isValid = compareHash(password, user.password);

      if (!isValid) throw new CredentialNotCorrectException();

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.sign(
          {
            email: user.email,
            uuid: user.uuid,
          },
          {
            algorithm: 'RS512',
            encoding: 'utf-8',
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
            encoding: 'utf-8',
            privateKey: JWT_CONSTANT.REFRESH_TOKEN_KEY_PAIR.refresh_token_private_key_content,
            expiresIn: '7d',
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
  async refreshToken(payload: any): Promise<any> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.sign(
          {
            email: payload.email,
            uuid: payload.uuid,
          },
          {
            algorithm: 'RS512',
            encoding: 'utf-8',
            privateKey: JWT_CONSTANT.ACCESS_TOKEN_KEY_PAIR.access_token_private_key_content,
            expiresIn: '1h',
          },
        ),
        this.jwtService.sign(
          {
            email: payload.email,
            uuid: payload.uuid,
          },
          {
            algorithm: 'RS256',
            encoding: 'utf8',
            privateKey: JWT_CONSTANT.REFRESH_TOKEN_KEY_PAIR.refresh_token_private_key_content,
            expiresIn: '7d',
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
  async register(payload: RegisterDTO): Promise<any> {
    try {
      const uniqueName = generateFromEmail(payload.email, 9);
      const user = await this.userService.createUser({
        email: payload.email,
        password: payload.password,
        firstName: 'Guest',
        lastName: uniqueName,
        provider: ProviderEnum.EMAIL,
      });

      if (!user) throw new UnauthorizedException('Register failed');

      return user;
    } catch (e) {
      throw e;
    }
  }
}
