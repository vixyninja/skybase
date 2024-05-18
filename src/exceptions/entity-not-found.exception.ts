import {ExceptionsConstraint} from '@/constants';
import {HttpException, HttpStatus} from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(error: any = ExceptionsConstraint.ENTITY_NOT_FOUND) {
    super(error, HttpStatus.NOT_FOUND);
  }
}
