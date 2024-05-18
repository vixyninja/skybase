import {ConfigsModule} from '@/configs';
import {UserEntity} from '@/entities';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserAuthService} from './user-auth.service';
import {UserSelfController} from './user-self.controller';
import {UserRepository} from './user.repository';
import {UserService} from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigsModule],
  controllers: [UserSelfController],
  providers: [UserRepository, UserAuthService, UserService],
  exports: [UserAuthService, UserService],
})
export class UserModule {}
