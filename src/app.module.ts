import {
  Global,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { CodeBankModule } from './code-bank/codeBank.module';
import { ChapterModule } from './chapter/chapter.module';
import { LectureModule } from './lecture/lecture.module';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { JWTService } from './helpers/jwtService.helper';
import { AppService } from './app.service';
import { ErrorResponse } from './helpers/errorHandlingService.helper';
import { HelperFunctions } from './helpers/helperFunctions.helper';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RoleAuthMiddleware } from './middlewares/roleAuth.middleware';

import { CodeBankController } from './code-bank/codeBank.controller';
import { ChapterController } from './chapter/chapter.controller';
import { LectureController } from './lecture/lecture.controller';
import { AppController } from './app.controller';

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
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    JWTService,
    ErrorResponse,
    HelperFunctions,
    AppService,
  ],
  exports: [JWTService, ErrorResponse, HelperFunctions],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, RoleAuthMiddleware)
      .exclude(
        { path: '/api/v1/chapters', method: RequestMethod.GET },
        { path: '/api/v1/chapters/search', method: RequestMethod.GET },
        { path: 'api/v1/chapters/:chapterId', method: RequestMethod.GET },
      )
      .forRoutes(CodeBankController, ChapterController, LectureController);
  }
}
