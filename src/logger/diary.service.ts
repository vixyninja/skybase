import {Diary, Log} from '@/models';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<Log>,
    @InjectModel(Diary.name) private readonly diaryModel: Model<Diary>,
  ) {}

  async createLog(message: string, level: string, context: string): Promise<Log> {
    const log = new this.logModel({message, level, context});
    return log.save();
  }

  async createDiary(type: string, note: string, data: Buffer): Promise<Diary> {
    const diary = new this.diaryModel({type, note, data});
    return diary.save();
  }
}
