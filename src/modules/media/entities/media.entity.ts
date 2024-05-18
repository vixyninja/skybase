import {BaseEntity} from 'src/base';
import {Column, Entity} from 'typeorm';

@Entity({
  name: 'media',
  orderBy: {
    createdAt: 'DESC',
  },
})
export class MediaEntity extends BaseEntity {
  @Column({
    name: 'public_id',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    comment: 'Public ID',
  })
  publicId: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
    name: 'signature',
    comment: 'Signature',
  })
  signature: string;

  @Column({
    type: 'numeric',
    default: 0,
    nullable: false,
    name: 'version',
    comment: 'Version',
  })
  version: number;

  @Column({
    type: 'numeric',
    default: 0,
    nullable: false,
    name: 'width',
    comment: 'Width',
  })
  width: number;

  @Column({
    type: 'numeric',
    default: 0,
    nullable: false,
    name: 'height',
    comment: 'Height',
  })
  height: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'format',
    comment: 'Format',
  })
  format: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'resource_type',
    comment: 'Resource Type',
  })
  resourceType: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'url',
    comment: 'URL',
  })
  url: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'secure_url',
    comment: 'Secure URL',
  })
  secureUrl: string;

  @Column({
    type: 'numeric',
    default: 0,
    nullable: false,
    name: 'bytes',
    comment: 'Bytes',
  })
  bytes: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'asset_id',
    comment: 'Asset ID',
  })
  assetId: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'version_id',
    comment: 'Version ID',
  })
  versionId: string;

  @Column({
    type: 'varchar',
    array: true,
    length: 255,
    nullable: false,
    name: 'tags',
    comment: 'Tags',
  })
  tags: string[];

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'e_tag',
    comment: 'E Tag',
  })
  etag: string;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
    name: 'placeholder',
    comment: 'Placeholder',
  })
  placeholder: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'original_filename',
    comment: 'Original Filename',
  })
  originalFilename: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'api_key',
    comment: 'API Key',
  })
  apiKey: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'folder',
    comment: 'Folder',
  })
  folder: string;

  constructor(partial: Partial<MediaEntity>) {
    super();
    Object.assign(this, partial);
  }
}
