import { Module } from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { LectureModule } from 'src/lecture/lecture.module';
import { ChapterModule } from 'src/chapter/chapter.module';

import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

import { StatisticsModel } from 'src/database/models/statistics.model';
import { LectureModel } from 'src/database/models/lecture.model';
import { ChapterModel } from 'src/database/models/chapter.model';

@Module({
  imports: [AuthModule, LectureModule, ChapterModule],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsModel, LectureModel, ChapterModel],
})
export class StatisticsModule {}
