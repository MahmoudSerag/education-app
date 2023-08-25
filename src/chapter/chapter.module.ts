import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureModule } from 'src/lecture/lecture.module';
import { ChapterModel } from 'src/database/models/chapter.model';
import { LectureModel } from 'src/database/models/lecture.model';

import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';

import { ChapterSchema } from 'src/database/schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chapter', schema: ChapterSchema }]),
    LectureModule,
  ],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterModel, LectureModel],
  exports: [
    MongooseModule.forFeature([{ name: 'Chapter', schema: ChapterSchema }]),
  ],
})
export class ChapterModule {}
