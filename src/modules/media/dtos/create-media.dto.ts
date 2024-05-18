import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';

export class CreateMediaDTO {
  @ApiProperty({
    description: 'Public ID of the media',
    example: 'v1624947344/2021/06/29/1624947344_0:0:0:0x0.png',
  })
  @IsString()
  publicId: string;

  @ApiProperty({
    description: 'Signature of the media',
    example: 'f1b9f8b1c2f8c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  signature: string;

  @ApiProperty({
    description: 'Version of the media',
    example: 1624947344,
  })
  @IsNumber()
  version: number;

  @ApiProperty({
    description: 'Width of the media',
    example: 0,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: 'Height of the media',
    example: 0,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    description: 'Format of the media',
    example: 'png',
  })
  @IsString()
  format: string;

  @ApiProperty({
    description: 'Resource type of the media',
    example: 'image',
  })
  @IsString()
  resourceType: string;

  @ApiProperty({
    description: 'URL of the media',
    example: 'http://res.cloudinary.com/dq7l8216n/image/upload/v1624947344/2021/06/29/1624947344_0:0:0:0x0.png',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Secure URL of the media',
    example: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1624947344/2021/06/29/1624947344_0:0:0:0x0.png',
  })
  @IsString()
  secureUrl: string;

  @ApiProperty({
    description: 'Bytes of the media',
    example: 0,
  })
  @IsNumber()
  bytes: number;

  @ApiProperty({
    description: 'Asset ID of the media',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  assetId: string;

  @ApiProperty({
    description: 'Version ID of the media',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  versionId: string;

  @ApiProperty({
    description: 'Tags of the media',
    example: ['image', 'png'],
  })
  @IsString({each: true})
  tags: string[];

  @ApiProperty({
    description: 'ETag of the media',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  etag: string;

  @ApiProperty({
    description: 'Placeholder of the media',
    example: false,
  })
  @IsString()
  placeholder: boolean;

  @ApiProperty({
    description: 'Original filename of the media',
    example: '1624947344_0:0:0:0x0.png',
  })
  @IsString()
  originalFilename: string;

  @ApiProperty({
    description: 'API Key of the media',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  apiKey: string;

  @ApiProperty({
    description: 'Folder of the media',
    example: '2021/06/29',
  })
  @IsString()
  folder: string;
  constructor(partial: Partial<CreateMediaDTO>) {
    Object.assign(this, partial);
  }
}
