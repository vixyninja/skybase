import {RouteConstants, StatusConstants} from '@/constants';
import {PublicRoute} from '@/decorators';
import {Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ApiBody, ApiProperty, ApiTags} from '@nestjs/swagger';
import {SkipThrottle} from '@nestjs/throttler';
import {Request, Response} from 'express';
import {AuthService} from './auth.service';
import {LoginDTO, RegisterDTO} from './dto';
import {LocalGuard, RefreshGuard} from './guards';
@PublicRoute()
@ApiTags(RouteConstants.AUTH)
@SkipThrottle()
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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  async login(@Res() res: Response, @Req() req: Request) {
    try {
      return res.status(HttpStatus.OK).json({
        message: StatusConstants.SUCCESS,
        data: req.user,
        statusCode: HttpStatus.OK,
      });
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
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res() res: Response, @Req() req: Request, @Body() body: RegisterDTO) {
    try {
      const user = await this.authService.register(body);

      return res.status(HttpStatus.CREATED).json({
        message: StatusConstants.SUCCESS,
        data: user,
        statusCode: HttpStatus.CREATED,
      });
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
  @Post('refresh')
  @UseGuards(RefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Res() res: Response, @Req() req: Request) {
    return res.status(HttpStatus.OK).json({
      message: StatusConstants.SUCCESS,
      data: req.user,
      statusCode: HttpStatus.OK,
    });
  }
}
