import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { CodeBankModule } from './code-bank/codeBank.module';
import { ChapterModule } from './chapter/chapter.module';
import { LectureModule } from './lecture/lecture.module';
import { UsersLecturesModule } from './users-lectures/usersLectures.module';
import { StatisticsModule } from './statistics/statistics.module';
import { UserModule } from './user/user.module';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { JWTService } from './helpers/jwtService.helper';
import { AppService } from './app.service';
import { ErrorResponse } from './helpers/errorHandlingService.helper';
import { HelperFunctions } from './helpers/helperFunctions.helper';
import { UploadAndDownloadService } from 'src/helpers/uploadAndDownloadService.helper';
import { PasswordService } from './helpers/passwordService.helper';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AdminMiddleware } from './middlewares/admin.middleware';

import { CodeBankController } from './code-bank/codeBank.controller';
import { ChapterController } from './chapter/chapter.controller';
import { LectureController } from './lecture/lecture.controller';
import { AppController } from './app.controller';
import { StatisticsController } from './statistics/statistics.controller';
import { UserController } from './user/user.controller';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({ ttl: 10, limit: 5 }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    AuthModule,
    CodeBankModule,
    ChapterModule,
    LectureModule,
    UsersLecturesModule,
    StatisticsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    JWTService,
    ErrorResponse,
    HelperFunctions,
    AppService,
    UploadAndDownloadService,
    PasswordService,
  ],
  exports: [
    JWTService,
    ErrorResponse,
    HelperFunctions,
    UploadAndDownloadService,
    PasswordService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const baseRoute = '/api/v1';
    const routes = [
      { path: `${baseRoute}/chapters`, method: RequestMethod.GET },
      { path: `${baseRoute}/chapters/search`, method: RequestMethod.GET },
      { path: `${baseRoute}/chapters/:chapterId`, method: RequestMethod.GET },
      { path: `${baseRoute}/lectures/:chapterId`, method: RequestMethod.GET },
      { path: `${baseRoute}/lectures`, method: RequestMethod.GET },
      { path: `${baseRoute}/lectures/search/all`, method: RequestMethod.GET },
      {
        path: `${baseRoute}/lectures/:lectureId/details`,
        method: RequestMethod.GET,
      },
      {
        path: `/api/v1/lectures/:lectureId/:pdfId`,
        method: RequestMethod.POST,
      },
    ];

    consumer
      .apply(LoggerMiddleware)
      .exclude(routes[0], routes[1], routes[2], routes[3], routes[4], routes[5])
      .forRoutes(
        CodeBankController,
        ChapterController,
        LectureController,
        StatisticsController,
        UserController,
      );
    consumer
      .apply(AdminMiddleware)
      .exclude(...routes)
      .forRoutes(
        CodeBankController,
        ChapterController,
        LectureController,
        StatisticsController,
      );
  }
}
