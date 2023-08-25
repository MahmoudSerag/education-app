import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureModel } from 'src/database/models/lecture.model';
import { ChapterModel } from 'src/database/models/chapter.model';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

import { LectureSchema } from 'src/database/schemas/lecture.schema';
import { ChapterSchema } from 'src/database/schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
    MongooseModule.forFeature([{ name: 'Chapter', schema: ChapterSchema }]),
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureModel, ChapterModel],
  exports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
  ],
})
export class LectureModule {}
