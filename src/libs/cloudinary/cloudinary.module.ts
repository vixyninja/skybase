import {Module} from '@nestjs/common';
import {CLOUDINARY_SERVICE} from 'src/constants';
import {CloudinaryProvider} from './cloudinary.provider';
import {CloudinaryService} from './cloudinary.service';

@Module({
  providers: [
    CloudinaryProvider,
    {
      provide: CLOUDINARY_SERVICE,
      useClass: CloudinaryService,
    },
  ],
  exports: [
    {
      provide: CLOUDINARY_SERVICE,
      useClass: CloudinaryService,
    },
  ],
})
export class CloudinaryModule {}
