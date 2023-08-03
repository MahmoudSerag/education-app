import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { CodeBankModule } from './code-bank/codeBank.module';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { JWTService } from './helpers/jwtService.helper';
import { ErrorResponse } from './helpers/errorHandlingService.helper';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RoleAuthMiddleware } from './middlewares/roleAuth.middleware';

import { CodeBankController } from './code-bank/codeBank.controller';

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
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    JWTService,
    ErrorResponse,
  ],
  exports: [JWTService, ErrorResponse],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, RoleAuthMiddleware)
      .forRoutes(CodeBankController);
  }
}
