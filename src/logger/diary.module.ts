import {ConfigsModule, ConfigsService} from '@/configs';
import {Diary, DiarySchema, Log, LogSchema} from '@/models';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {DiaryService} from './diary.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      useFactory: async (configsService: ConfigsService) => configsService.mongoConnection(),
    }),
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema,
      },
      {
        name: Diary.name,
        schema: DiarySchema,
      },
    ]),
  ],
  providers: [DiaryService],
  exports: [DiaryService],
})
export class LoggerModule {}
