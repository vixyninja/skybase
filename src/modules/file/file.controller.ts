import {JwtGuard} from '@/auth';
import {isUUIDv4} from '@/validation';
import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Param, Res, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiProperty, ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import {MessageConstant, RouteConstants, StatusConstants} from 'src/constants';
import {FileService} from './file.service';

@ApiTags(RouteConstants.file)
@Controller(RouteConstants.file)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({summary: 'Get File by uuid'})
  @ApiProperty({
    example: {
      uuid: '039904b9-6043-443d-9ba9-9d64bf53b9ec',
    },
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  @Get(':uuid')
  async getFileByUuid(@Param('uuid') uuid: string, @Res() res: Response) {
    if (!isUUIDv4(uuid)) throw new BadRequestException(MessageConstant.INVALID_UUID);

    const File = await this.fileService.findMediaById(uuid);

    return res.status(HttpStatus.OK).json({
      data: File,
      statusCode: HttpStatus.OK,
      message: MessageConstant.FILE_GET_SUCCESS,
      status: StatusConstants.SUCCESS,
    });
  }
}
