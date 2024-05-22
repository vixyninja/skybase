import {ConfigsService} from '@/configs';
import {BadRequestException, Injectable} from '@nestjs/common';
import {UploadApiOptions, v2 as cloudinary} from 'cloudinary';
import {ICloudinary} from './cloudinary.interface';
import {CloudinaryResponse} from './cloudinary.provider';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService implements ICloudinary {
  constructor(private readonly configService: ConfigsService) {}

  async upload(file: Express.Multer.File, folder?: string): Promise<CloudinaryResponse> {
    try {
      const options: UploadApiOptions = {
        folder: folder || this.configService.cloudinaryConfig().folder,
        timestamp: Date.now(),
        unique_filename: true,
      };

      return new Promise((resolve, rejects) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
          if (result) {
            resolve(result);
          } else {
            rejects(new BadRequestException(error.message));
          }
        });
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    } catch (e) {
      throw e;
    }
  }

  async uploads(files: Express.Multer.File[], folder?: string): Promise<CloudinaryResponse[]> {
    try {
      const options: UploadApiOptions = {
        folder: folder || this.configService.cloudinaryConfig().folder,
        timestamp: Date.now(),
        unique_filename: true,
      };

      const responses: CloudinaryResponse[] = [];

      for await (const iterator of files) {
        const response = await new Promise((resolve, rejects) => {
          const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (result) {
              resolve(result);
            } else {
              rejects(new BadRequestException(error.message));
            }
          });
          streamifier.createReadStream(iterator.buffer).pipe(uploadStream);
        });
        responses.push(response as CloudinaryResponse);
      }

      return responses;
    } catch (e) {
      throw e;
    }
  }

  async destroy(publicId: string): Promise<any> {
    try {
      return new Promise((resolve, rejects) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (result) {
            resolve(result);
          } else {
            rejects(new BadRequestException(error.message));
          }
        });
      });
    } catch (e) {
      throw e;
    }
  }

  async destroyPrefix(prefix: string): Promise<any> {
    try {
      return new Promise((resolve, rejects) => {
        cloudinary.api.delete_resources_by_prefix(prefix, (error, result) => {
          if (result) {
            resolve(result);
          } else {
            rejects(new BadRequestException(error.message));
          }
        });
      });
    } catch (e) {
      throw e;
    }
  }
}
