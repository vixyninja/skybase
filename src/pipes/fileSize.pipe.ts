import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class FileSizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.size > 1024 * 10) {
      throw new BadRequestException('File size is too large');
    }

    return value;
  }
}
