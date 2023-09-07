import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ChapterModule } from 'src/chapter/chapter.module';
import { UsersLecturesModule } from 'src/users-lectures/usersLectures.module';

import { LectureModel } from 'src/database/models/lecture.model';
import { ChapterModel } from 'src/database/models/chapter.model';
import { UsersLecturesModel } from 'src/database/models/usersLectures.model';

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
    UsersLecturesModule,
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureModel, ChapterModel, UsersLecturesModel],
  exports: [
    MongooseModule.forFeature([{ name: 'Lecture', schema: LectureSchema }]),
  ],
})
export class LectureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const routes = [
      { path: '/api/v1/lectures/:chapterId', method: RequestMethod.POST },
      { path: '/api/v1/lectures/:lectureId', method: RequestMethod.PUT },
      {
        path: '/api/v1/lectures/:lectureId/details',
        method: RequestMethod.GET,
      },
      {
        path: '/api/v1/lectures/:lectureId/:pdf',
        method: RequestMethod.GET,
      },
    ];

    consumer.apply(ValidationMiddleware).forRoutes(routes[0], routes[1]);
    consumer
      .apply(StudentMiddleware, ContentAccessControlMiddleware)
      .forRoutes(routes[2], routes[3]);
  }
}
