import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChapterModel } from 'src/database/models/chapter.model';

import { ChapterController } from './chapter.controller';
import { ChapterService } from './chapter.service';

import { ChapterSchema } from 'src/database/schemas/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chapter', schema: ChapterSchema }]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterModel],
})
export class ChapterModule {}
