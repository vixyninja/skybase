import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class UUIDParamDTO {
  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  uuid: string;
}
