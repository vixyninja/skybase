import {RouteConstants} from '@/constants';
import {User} from '@/decorators';
import {Controller, Get, HttpStatus, Res} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Response} from 'express';
import {UserService} from './user.service';

@ApiTags(RouteConstants.USER)
@Controller(RouteConstants.USER)
export class UserSelfController {
  constructor(private readonly userService: UserService) {}

  @Get('self')
  async getSelf(@User('uuid') uuid: string, @Res() res: Response) {
    try {
      const user = await this.userService.readUser(uuid);

      return res.status(HttpStatus.OK).json({
        message: 'Get self user success',
        data: user,
        statusCode: HttpStatus.OK,
      });
    } catch (e) {
      throw e;
    }
  }
}
