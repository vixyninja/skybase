import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';

export class LoginDTO {
  @Expose({name: 'login_name'})
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  loginName: string;

  @Expose({name: 'password'})
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
