import {FileEntity} from '@/entities';
import {ICloudinary} from '@/libs';
import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {validate} from 'class-validator';
import {CLOUDINARY_SERVICE, MessageConstant} from 'src/constants';
import {CreateFileDTO} from './dto';
import {FileRepository} from './file.repository';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    @Inject(CLOUDINARY_SERVICE)
    private readonly cloudinaryService: ICloudinary,
  ) {}

  async findMediaById(uuid: string): Promise<FileEntity> {
    try {
      const media = await this.fileRepository.findMediaById({uuid});

      if (!media) throw new BadRequestException(MessageConstant.FILE_GET_FAILED);
      return media;
    } catch (e) {
      throw e;
    }
  }

  async findMediaByIds(uuids: string[]): Promise<FileEntity[]> {
    try {
      const listMedia = await this.fileRepository.findMediaByIds({uuids});

      return listMedia;
    } catch (e) {
      throw e;
    }
  }

  async createMedia(file: Express.Multer.File): Promise<FileEntity> {
    try {
      const upload = await this.cloudinaryService.upload(file);

      if (!upload) throw new BadRequestException(MessageConstant.FILE_UPLOAD_FAILED);

      const arg: CreateFileDTO = {
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

      if (validator.length > 0) throw new BadRequestException(MessageConstant.FILE_UPLOAD_FAILED);

      const media = await this.fileRepository.storeMedia(arg);

      if (!media) throw new BadRequestException(MessageConstant.FILE_UPLOAD_FAILED);

      return media;
    } catch (e) {
      throw e;
    }
  }

  async deleteMedia(uuid: string): Promise<boolean> {
    try {
      const deleteMedia = await this.fileRepository.deleteMedia({uuid: uuid});

      if (!deleteMedia) throw new BadRequestException(MessageConstant.FILE_DELETE_FAILED);

      return deleteMedia;
    } catch (e) {
      throw e;
    }
  }
}
