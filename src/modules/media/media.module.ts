import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CloudinaryModule} from '@/lib';
import {MediaEntity} from './entities';
import {MediaController} from './media.controller';
import {MediaService} from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity]), CloudinaryModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
