import {PartialType} from '@nestjs/swagger';
import {CreateCredentialDTO} from './create-credential.dto';

export class UpdateCredentialDTO extends PartialType(CreateCredentialDTO) {}
