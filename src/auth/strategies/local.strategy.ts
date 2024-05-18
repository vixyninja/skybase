import {CredentialNotCorrectException} from '@/exceptions';
import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {IStrategyOptions, Strategy} from 'passport-local';
import {AuthService} from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.authenticate(username, password);

      if (!user) throw new CredentialNotCorrectException();

      return user;
    } catch (e) {
      throw e;
    }
  }
}
