import {ConfigsModule} from '@/configs';
import {UserModule} from '@/modules/user';
import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtStrategy, LocalStrategy, RefreshStrategy} from './strategies';

@Module({
  imports: [ConfigsModule, PassportModule, UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
