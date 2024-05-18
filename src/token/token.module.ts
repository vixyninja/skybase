import {Module} from '@nestjs/common';
import {TokenService} from './token.service';

@Module({
  imports: [],
  providers: [
    {
      provide: TokenService,
      useFactory: () => new TokenService(),
    },
  ],
  exports: [TokenService],
})
export class TokenModule {}
