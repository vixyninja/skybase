import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';

export class CreateFileDTO {
  @ApiProperty({
    description: 'Public ID of the file',
    example: 'v1624947344/2021/06/29/1624947344_0:0:0:0x0.png',
  })
  @IsString()
  publicId: string;

  @ApiProperty({
    description: 'Signature of the file',
    example: 'f1b9f8b1c2f8c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  signature: string;

  @ApiProperty({
    description: 'Version of the file',
    example: 1624947344,
  })
  @IsNumber()
  version: number;

  @ApiProperty({
    description: 'Width of the file',
    example: 0,
  })
  @IsNumber()
  width: number;

  @ApiProperty({
    description: 'Height of the file',
    example: 0,
  })
  @IsNumber()
  height: number;

  @ApiProperty({
    description: 'Format of the file',
    example: 'png',
  })
  @IsString()
  format: string;

  @ApiProperty({
    description: 'Resource type of the file',
    example: 'image',
  })
  @IsString()
  resourceType: string;

  @ApiProperty({
    description: 'URL of the file',
    example: 'http://res.cloudinary.com/dq7l8216n/image/upload/v1624947344/2021/06/29/1624947344_0:0:0:0x0.png',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: 'Secure URL of the file',
    example: 'https://res.cloudinary.com/dq7l8216n/image/upload/v1624947344/2021/06/29/1624947344_0:0:0:0x0.png',
  })
  @IsString()
  secureUrl: string;

  @ApiProperty({
    description: 'Bytes of the file',
    example: 0,
  })
  @IsNumber()
  bytes: number;

  @ApiProperty({
    description: 'Asset ID of the file',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  assetId: string;

  @ApiProperty({
    description: 'Version ID of the file',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  versionId: string;

  @ApiProperty({
    description: 'Tags of the file',
    example: ['image', 'png'],
  })
  @IsString({each: true})
  tags: string[];

  @ApiProperty({
    description: 'ETag of the file',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  etag: string;

  @ApiProperty({
    description: 'Placeholder of the file',
    example: false,
  })
  @IsString()
  placeholder: boolean;

  @ApiProperty({
    description: 'Original filename of the file',
    example: '1624947344_0:0:0:0x0.png',
  })
  @IsString()
  originalFilename: string;

  @ApiProperty({
    description: 'API Key of the file',
    example: 'c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2',
  })
  @IsString()
  apiKey: string;

  @ApiProperty({
    description: 'Folder of the file',
    example: '2021/06/29',
  })
  @IsString()
  folder: string;
  constructor(partial: Partial<CreateFileDTO>) {
    Object.assign(this, partial);
  }
}
