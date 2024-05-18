import {RefreshTokenType} from '@/interfaces';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {SecureConstant} from 'secure';
import {AuthService} from '../auth.service';
@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: SecureConstant.REFRESH_TOKEN_PUBLIC,
    });
  }

  async validate(payload: RefreshTokenType) {
    try {
      return await this.authService.refreshToken({...payload});
    } catch (e) {
      throw e;
    }
  }
}
