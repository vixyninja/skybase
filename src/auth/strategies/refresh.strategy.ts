import {JWT_CONSTANT} from '@/constants';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.REFRESH_TOKEN_KEY_PAIR.refresh_token_public_key_content,
      passReqToCallback: true,
    });
  }

  async validate(_: any, token: string) {
    try {
      return await this.authService.refreshToken(token);
    } catch (e) {
      throw e;
    }
  }
}
