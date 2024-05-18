import {PartialType} from '@nestjs/swagger';
import {CreateUserDTO} from './create-user.dto';
import {IsOptional, IsPhoneNumber, MaxLength, MinLength} from 'class-validator';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsOptional()
  readonly deviceToken: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  @MinLength(10)
  @MaxLength(14)
  readonly phone: string;
}
