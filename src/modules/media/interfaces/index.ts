import {MediaEntity} from '../entities';

export interface IMedia {
  findMediaById(uuid: string): Promise<MediaEntity>;
  findMediaByIds(uuids: string[]): Promise<MediaEntity[]>;
  createMedia(file: Express.Multer.File): Promise<MediaEntity>;
  updateMedia(uuid: string, file: Express.Multer.File): Promise<MediaEntity>;
  deleteMedia(uuid: string): Promise<MediaEntity>;
}
