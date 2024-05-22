import {ConfigsModule} from '@/configs';
import {UserEntity} from '@/entities';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from './user.controller';
import {UserRepository} from './user.repository';
import {UserService} from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigsModule],
  controllers: [UserController],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
