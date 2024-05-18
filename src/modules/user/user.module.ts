import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserEntity} from '../../entities';
import {UserAuthService} from './user-auth.service';
import {UserSelfController} from './user-self.controller';
import {UserRepository} from './user.repository';
import {UserService} from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserSelfController],
  providers: [UserRepository, UserAuthService, UserService],
  exports: [UserAuthService, UserService],
})
export class UserModule {}
