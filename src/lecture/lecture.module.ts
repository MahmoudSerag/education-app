import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LectureModel } from 'src/database/models/lecture.model';
import { ChapterModel } from 'src/database/models/chapter.model';
import { ChapterModule } from 'src/chapter/chapter.module';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

import { LectureSchema } from 'src/database/schemas/lecture.schema';

import { ValidationMiddleware } from 'src/middlewares/bodyValidation.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
    forwardRef(() => ChapterModule),
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureModel, ChapterModel],
  exports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
  ],
})
export class LectureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes(
        { path: 'api/v1/lectures/:chapterId', method: RequestMethod.POST },
        { path: 'api/v1/lectures/:lectureId', method: RequestMethod.PUT },
      );
  }
}
