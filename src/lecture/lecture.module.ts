import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ChapterModule } from 'src/chapter/chapter.module';
import { OperationLogsModule } from 'src/operation-logs/operationLogs.module';

import { LectureModel } from 'src/database/models/lecture.model';
import { ChapterModel } from 'src/database/models/chapter.model';
import { OperationLogsModel } from 'src/database/models/operationLogs.model';

import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

import { LectureSchema } from 'src/database/schemas/lecture.schema';

import { ValidationMiddleware } from 'src/middlewares/bodyValidation.middleware';
import { StudentMiddleware } from 'src/middlewares/student.middleware';
import { ContentAccessControlMiddleware } from 'src/middlewares/contentAccessControl.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
    forwardRef(() => ChapterModule),
    OperationLogsModule,
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureModel, ChapterModel, OperationLogsModel],
  exports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
  ],
})
export class LectureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const baseRoute = '/api/v1';

    const routes = [
      { path: `${baseRoute}/lectures/:chapterId`, method: RequestMethod.POST },
      { path: `${baseRoute}/lectures/:lectureId`, method: RequestMethod.PUT },
      {
        path: `${baseRoute}/lectures/:lectureId/details`,
        method: RequestMethod.GET,
      },
      {
        path: `${baseRoute}/lectures/:lectureId/:pdf`,
        method: RequestMethod.POST,
      },
    ];

    consumer.apply(ValidationMiddleware).forRoutes(routes[0], routes[1]);
    consumer
      .apply(StudentMiddleware, ContentAccessControlMiddleware)
      .forRoutes(routes[2], routes[3]);
  }
}
