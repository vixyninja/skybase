import {DiaryEnum} from '@/enums';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type DiaryDocument = HydratedDocument<Diary>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Diary {
  @Prop({
    required: true,
  })
  type: DiaryEnum;

  @Prop({
    isRequired: false,
  })
  note: string;

  @Prop({
    required: true,
  })
  data: Buffer;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
