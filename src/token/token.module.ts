import {ConfigsModule, ConfigsService} from '@/configs';
import {Module} from '@nestjs/common';
import {TokenService} from './token.service';

@Module({
  imports: [ConfigsModule],
  providers: [
    {
      inject: [ConfigsService],
      provide: TokenService,
      useFactory: (configsService: ConfigsService) => new TokenService(configsService),
    },
  ],
  exports: [TokenService],
})
export class TokenModule {}
