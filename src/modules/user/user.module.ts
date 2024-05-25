import {ConfigsModule} from '@/configs';
import {CredentialEntity, DeviceEntity, ExternalProviderEntity, UserEntity} from '@/entities';
import {CredentialSubscriber} from '@/subscribers';
import {TokenModule} from '@/token';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from './controllers';
import {CredentialRepository, UserRepository} from './repositories';
import {CredentialService, UserService} from './services';

@Module({
  imports: [
    ConfigsModule,
    TokenModule,
    TypeOrmModule.forFeature([UserEntity, CredentialEntity, DeviceEntity, ExternalProviderEntity]),
  ],
  controllers: [UserController],
  providers: [UserRepository, CredentialRepository, UserService, CredentialService, CredentialSubscriber],
  exports: [UserService, CredentialService],
})
export class UserModule {}
