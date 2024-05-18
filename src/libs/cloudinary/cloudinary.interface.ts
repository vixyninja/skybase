import {CloudinaryResponse} from './cloudinary.provider';

export interface ICloudinary {
  upload(file: Express.Multer.File, folder?: string): Promise<CloudinaryResponse>;
  uploads(files: Express.Multer.File[], folder?: string): Promise<CloudinaryResponse[]>;
  destroy(publicId: string): Promise<any>;
  destroyPrefix(prefix: string): Promise<any>;
}
