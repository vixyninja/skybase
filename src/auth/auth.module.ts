import {ConfigsModule} from '@/configs';
import {UserModule} from '@/modules/user';
import {TokenModule} from '@/token';
import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy, LocalStrategy, RefreshStrategy} from './strategies';

@Module({
  imports: [ConfigsModule, PassportModule, UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
