import {ExceptionsConstraint} from '@/constants';
import {HttpException, HttpStatus} from '@nestjs/common';

export class CredentialNotCorrectException extends HttpException {
  constructor(error: any = ExceptionsConstraint.CREDENTIAL_NOT_CORRECT) {
    super(error, HttpStatus.UNAUTHORIZED);
  }
}
