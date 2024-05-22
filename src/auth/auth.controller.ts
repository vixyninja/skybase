import {MessageConstant, RouteConstants, StatusConstants} from '@/constants';
import {PublicRoute} from '@/decorators';
import {Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiProperty, ApiTags} from '@nestjs/swagger';
import {Request, Response} from 'express';
import {AuthService} from './auth.service';
import {LoginDTO, RegisterDTO} from './dto';
import {LocalGuard, RefreshGuard} from './guards';
@PublicRoute()
@ApiTags(RouteConstants.AUTH)
@Controller(RouteConstants.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiProperty({
    type: 'string',
    example: {
      email: 'example@gmail.com',
      password: 'password',
    },
  })
  @ApiBody({
    type: LoginDTO,
  })
  @ApiOperation({summary: 'Login with email and password'})
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  async login(@Res() res: Response, @Req() req: Request) {
    try {
      const user = req.user;

      return res
        .status(HttpStatus.OK)
        .json({
          message: MessageConstant.LOGIN_SUCCESS,
          data: user,
          statusCode: HttpStatus.OK,
          status: StatusConstants.SUCCESS,
        })
        .end();
    } catch (e) {
      throw e;
    }
  }

  @ApiProperty({
    type: 'string',
    example: {
      email: 'example@gmail.com',
      password: 'password',
    },
  })
  @ApiBody({
    type: RegisterDTO,
  })
  @ApiOperation({summary: 'Register with email and password'})
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res: Response, @Body() body: RegisterDTO) {
    try {
      const user = await this.authService.register(body);

      return res
        .status(HttpStatus.CREATED)
        .json({
          data: user,
          statusCode: HttpStatus.CREATED,
          message: MessageConstant.REGISTER_SUCCESS,
          status: StatusConstants.SUCCESS,
        })
        .end();
    } catch (e) {
      throw e;
    }
  }

  @ApiProperty({
    type: 'string',
    example: {
      refreshToken: 'refreshToken',
    },
  })
  @ApiBody({
    type: 'string',
  })
  @ApiOperation({summary: 'Refresh token'})
  @Post('refresh')
  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Res() res: Response, @Req() req: Request) {
    const user = req.user;
    return res
      .status(HttpStatus.OK)
      .json({
        message: MessageConstant.TOKEN_CREATED,
        status: StatusConstants.SUCCESS,
        data: user,
        statusCode: HttpStatus.OK,
      })
      .end();
  }
}
