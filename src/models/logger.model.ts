import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Log {
  @Prop()
  message: string;

  @Prop()
  level: string;

  @Prop()
  context: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
