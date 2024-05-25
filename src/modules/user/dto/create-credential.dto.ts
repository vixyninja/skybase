import {Expose} from 'class-transformer';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCredentialDTO {
  @Expose({name: 'login_name'})
  @IsNotEmpty()
  @IsString()
  readonly loginName: string;

  @Expose({name: 'password'})
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
