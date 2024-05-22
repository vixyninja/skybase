import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, isUUID} from 'class-validator';

/**
 * @description This is DTO for UUID param
 */
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

/**
 * @param {string} val
 * @param {UUIDVersion} version
 * @description This is function for check UUID
 * @returns {boolean}
 */
export function isUUIDv4(val: string, version?: validator.UUIDVersion): boolean {
  return isUUID(val, 4);
}
