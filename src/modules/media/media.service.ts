import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {validate} from 'class-validator';
import {CLOUDINARY_SERVICE} from 'src/constants';
import {ICloudinary} from '@/libs';
import {Repository} from 'typeorm';
import {CreateMediaDTO} from './dtos';
import {MediaEntity} from './entities';
import {IMedia} from './interfaces';

@Injectable()
export class MediaService implements IMedia {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
    @Inject(CLOUDINARY_SERVICE)
    private readonly cloudinaryService: ICloudinary,
  ) {}

  async findMediaById(uuid: string): Promise<MediaEntity> {
    try {
      const media = await this.mediaRepository
        .createQueryBuilder('media')
        .where('media.uuid = :uuid', {uuid: uuid})
        .getOne();

      if (!media) throw new BadRequestException('Media not found');
      return media;
    } catch (e) {
      throw e;
    }
  }

  async findMediaByIds(uuids: string[]): Promise<MediaEntity[]> {
    try {
      const medias: MediaEntity[] = await Promise.all<MediaEntity>(
        uuids.map(async (uuid) => {
          const media = await this.mediaRepository
            .createQueryBuilder('media')
            .where('media.uuid = :uuid', {uuid: uuid})
            .getOne();
          if (!media) throw new BadRequestException('Media have uuid ' + uuid + ' not found');
          return media;
        }),
      );
      return medias;
    } catch (e) {
      throw e;
    }
  }

  async createMedia(file: Express.Multer.File): Promise<MediaEntity> {
    try {
      const upload = await this.cloudinaryService.upload(file);
      if (!upload) throw new BadRequestException('Cannot upload media');
      const arg: CreateMediaDTO = {
        publicId: upload.public_id,
        url: upload.secure_url,
        format: upload.format,
        bytes: upload.bytes,
        width: upload.width,
        height: upload.height,
        originalFilename: upload.original_filename,
        apiKey: upload.api_key,
        assetId: upload.asset_id,
        etag: upload.etag,
        folder: upload.folder,
        placeholder: upload.placeholder,
        resourceType: upload.resource_type,
        secureUrl: upload.secure_url,
        signature: upload.signature,
        tags: upload.tags,
        version: upload.version,
        versionId: upload.version_id,
      };
      const validator = await validate(arg);
      if (validator.length > 0) throw new BadRequestException('Cannot create media');

      const createMedia = await this.mediaRepository.createQueryBuilder().insert().values(arg).execute();
      if (!createMedia) throw new BadRequestException('Cannot create media');

      const media = await this.findMediaById(createMedia.identifiers[0].uuid);
      if (!media) throw new BadRequestException('Cannot find media');

      return media;
    } catch (e) {
      throw e;
    }
  }

  async updateMedia(uuid: string, file: Express.Multer.File): Promise<MediaEntity> {
    try {
      const upload = await this.cloudinaryService.upload(file);
      if (!upload) throw new BadRequestException('Cannot upload media');

      const arg: CreateMediaDTO = {
        publicId: upload.public_id,
        url: upload.secure_url,
        format: upload.format,
        bytes: upload.bytes,
        width: upload.width,
        height: upload.height,
        originalFilename: upload.original_filename,
        apiKey: upload.api_key,
        assetId: upload.asset_id,
        etag: upload.etag,
        folder: upload.folder,
        placeholder: upload.placeholder,
        resourceType: upload.resource_type,
        secureUrl: upload.secure_url,
        signature: upload.signature,
        tags: upload.tags,
        version: upload.version,
        versionId: upload.version_id,
      };
      const validator = await validate(arg);
      if (validator.length > 0) throw new BadRequestException('Cannot create media');

      const updateMedia = await this.mediaRepository
        .createQueryBuilder()
        .from(MediaEntity, 'media')
        .update()
        .set(arg)
        .where('uuid = :uuid', {uuid: uuid})
        .execute();
      if (!updateMedia) throw new BadRequestException('Cannot update media');

      const updatedMedia = await this.findMediaById(uuid);
      if (!updatedMedia) throw new BadRequestException('Cannot find media');

      return updatedMedia;
    } catch (e) {
      throw e;
    }
  }

  async deleteMedia(uuid: string): Promise<MediaEntity> {
    try {
      const media = await this.findMediaById(uuid);
      if (!media) throw new BadRequestException('Media not found');

      const deleteMedia = await this.mediaRepository
        .createQueryBuilder()
        .from(MediaEntity, 'media')
        .delete()
        .where('uuid = :uuid', {uuid: uuid})
        .execute()
        .then((value) => {
          this.cloudinaryService.destroy(media.publicId);
          return value;
        });

      if (!deleteMedia) throw new BadRequestException('Cannot delete media');

      return media;
    } catch (e) {
      throw e;
    }
  }
}
