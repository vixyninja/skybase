import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import {ApiOperation, ApiProperty, ApiTags} from '@nestjs/swagger';
import {ThrottlerGuard} from '@nestjs/throttler';
import {isUUID} from 'class-validator';
import {Response} from 'express';
import {CLOUDINARY_SERVICE, RouteConstants} from 'src/constants';
import {ICloudinary} from '@/lib';
import {MediaService} from './media.service';
import {JwtGuard} from '@/auth';

@ApiTags(RouteConstants.MEDIA)
@Controller(RouteConstants.MEDIA)
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    @Inject(CLOUDINARY_SERVICE)
    private readonly cloudinaryService: ICloudinary,
  ) {}

  @ApiOperation({summary: 'Get media by uuid'})
  @ApiProperty({
    example: {
      uuid: '2f9c9b9c-9b9c-9b9c-9b9c-9b9c9b9c9b9c',
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(ThrottlerGuard, JwtGuard)
  @Get(':uuid')
  async getMediaByUuid(@Param('uuid') uuid: string, @Res() response: Response) {
    if (!isUUID(uuid)) throw new BadRequestException('Invalid uuid');

    const media = await this.mediaService.findMediaById(uuid);

    response.status(HttpStatus.OK).json({
      data: media,
      statusCode: HttpStatus.OK,
      message: 'Get media successfully',
    });
  }
}
