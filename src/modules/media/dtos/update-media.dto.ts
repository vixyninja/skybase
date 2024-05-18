import {PartialType} from '@nestjs/swagger';
import {CreateMediaDTO} from './create-media.dto';

export class UpdateMediaDTO extends PartialType(CreateMediaDTO) {}
