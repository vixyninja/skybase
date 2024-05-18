import {ExceptionsConstraint, JWT_CONSTANT} from '@/constants';
import {CredentialNotCorrectException} from '@/exceptions';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_CONSTANT.ACCESS_TOKEN_KEY_PAIR.access_token_public_key_content,
    });
  }

  async validate(payload: any): Promise<any> {
    try {
      const user = await this.authService.validation(payload);

      if (!user) throw new CredentialNotCorrectException(ExceptionsConstraint.UNAUTHORIZED);

      return user;
    } catch (e) {
      throw e;
    }
  }
}
