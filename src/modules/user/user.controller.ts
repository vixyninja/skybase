import {MessageConstant, RouteConstants, StatusConstants} from '@/constants';
import {User} from '@/decorators';
import {isUUIDv4} from '@/validation';
import {BadRequestException, Controller, Get, HttpCode, HttpStatus, Res} from '@nestjs/common';
import {ApiOperation, ApiProperty, ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import {UserService} from './user.service';

@ApiTags(RouteConstants.USER)
@Controller(RouteConstants.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiProperty({
    type: 'string',
    description: 'Get self user',
    example: {
      uuid: 'ddc28b09-fdbb-4ffc-be20-88902a4b9459',
    },
  })
  @ApiOperation({summary: 'Get self user by uuid'})
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async getSelf(@User('uuid') uuid: string, @Res() res: Response) {
    try {
      if (isUUIDv4(uuid) === false) throw new BadRequestException(MessageConstant.INVALID_UUID);

      const user = await this.userService.readUser(uuid);

      return res.status(HttpStatus.OK).json({
        message: MessageConstant.GET_USER_SUCCESS,
        data: user,
        statusCode: HttpStatus.OK,
        status: StatusConstants.SUCCESS,
      });
    } catch (e) {
      throw e;
    }
  }
}
