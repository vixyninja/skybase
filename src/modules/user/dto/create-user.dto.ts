import {Expose} from 'class-transformer';
import {IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';

export class CreateUserDTO {
  @Expose({name: 'first_name'})
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  readonly firstName: string;

  @Expose({name: 'last_name'})
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  readonly lastName: string;

  @Expose({name: 'provider'})
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(12)
  readonly provider: string;
}
