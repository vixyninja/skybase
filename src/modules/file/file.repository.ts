import {BaseAbstractRepository} from '@/base';
import {FileEntity} from '@/entities';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class FileRepository extends BaseAbstractRepository<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    readonly repository: Repository<FileEntity>,
  ) {
    super(repository);
  }

  /**
   * @param {string} uuid
   * @description This is method for find media by uuid
   * @return {Promise<FileEntity>}
   */
  public findMediaById({uuid}: {uuid: string}): Promise<FileEntity> {
    return Promise.resolve(
      this.repository
        .createQueryBuilder('tbl_media')
        .where('media.uuid = :uuid', {uuid})
        .getOne()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string[]} uuids
   * @description This is method for find media by uuids
   * @return {Promise<FileEntity[]>}
   */
  public findMediaByIds({uuids}: {uuids: string[]}): Promise<FileEntity[]> {
    return Promise.resolve(
      this.repository
        .createQueryBuilder('tbl_media')
        .where('media.uuid IN (:...uuids)', {uuids})
        .getMany()
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   * @param {string} publicId
   * @param {string} signature
   * @param {number} version
   * @param {number} width
   * @param {number} height
   * @param {string} format
   * @param {string} resourceType
   * @param {string} url
   * @param {string} secureUrl
   * @param {number} bytes
   * @param {string} assetId
   * @param {string} versionId
   * @param {string[]} tags
   * @param {string} etag
   * @param {boolean} placeholder
   * @param {string} originalFilename
   * @param {string} apiKey
   * @param {string} folder
   * @description This is method for store media
   * @return {Promise<FileEntity>}
   */
  public storeMedia({
    publicId,
    signature,
    version,
    width,
    height,
    format,
    resourceType,
    url,
    secureUrl,
    bytes,
    assetId,
    versionId,
    tags,
    etag,
    placeholder,
    originalFilename,
    apiKey,
    folder,
  }: {
    publicId: string;
    signature: string;
    version: number;
    width: number;
    height: number;
    format: string;
    resourceType: string;
    url: string;
    secureUrl: string;
    bytes: number;
    assetId: string;
    versionId: string;
    tags: string[];
    etag: string;
    placeholder: boolean;
    originalFilename: string;
    apiKey: string;
    folder: string;
  }): Promise<FileEntity> {
    return Promise.resolve(
      this.repository
        .createQueryBuilder('tbl_media')
        .insert()
        .values({
          publicId,
          signature,
          version,
          width,
          height,
          format,
          resourceType,
          url,
          secureUrl,
          bytes,
          assetId,
          versionId,
          tags,
          etag,
          placeholder,
          originalFilename,
          apiKey,
          folder,
        })
        .execute()
        .then((result) => this.findMediaById({uuid: result.identifiers[0].uuid}))
        .catch((e) => {
          throw e;
        }),
    );
  }

  /**
   *
   * @param {string} uuid
   * @description This is method for delete media
   * @return {Promise<boolean>}
   */
  public deleteMedia({uuid}: {uuid: string}): Promise<boolean> {
    return Promise.resolve(
      this.repository
        .createQueryBuilder('tbl_media')
        .softDelete()
        .where('media.uuid = :uuid', {uuid})
        .execute()
        .then((result) => result.affected > 0)
        .catch((e) => {
          throw e;
        }),
    );
  }
}
