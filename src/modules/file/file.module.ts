import {FileEntity} from '@/entities';
import {CloudinaryModule} from '@/libs';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FileController} from './file.controller';
import {FileRepository} from './file.repository';
import {FileService} from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), CloudinaryModule],
  controllers: [FileController],
  providers: [FileRepository, FileService],
  exports: [FileService],
})
export class MediaModule {}
