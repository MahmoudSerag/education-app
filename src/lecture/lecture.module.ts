import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureModel } from 'src/database/models/lecture.model';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

import { LectureSchema } from 'src/database/schemas/lecture.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureModel],
})
export class LectureModule {}
