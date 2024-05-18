import {ConfigsService} from '@/configs';
import {Provider} from '@nestjs/common';
import {UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary} from 'cloudinary';
import {CLOUDINARY_PROVIDER} from 'src/constants';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY_PROVIDER,
  useFactory: (configService: ConfigsService) => {
    const config = cloudinary.config({
      cloud_name: configService.cloudinaryConfig().cloudName,
      api_key: configService.cloudinaryConfig().apiKey,
      api_secret: configService.cloudinaryConfig().apiSecret,
      secure: true,
    });

    return {
      config,
    };
  },
  inject: [ConfigsService],
};

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
