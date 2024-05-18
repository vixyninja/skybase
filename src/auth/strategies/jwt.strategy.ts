import {AccessTokenType} from '@/interfaces';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {SecureConstant} from 'secure';
import {AuthService} from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SecureConstant.ACCESS_TOKEN_PUBLIC,
    });
  }

  async validate(payload: AccessTokenType): Promise<any> {
    try {
      const user = await this.authService.validation({...payload});

      return user;
    } catch (e) {
      throw e;
    }
  }
}
