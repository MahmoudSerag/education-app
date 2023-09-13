import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { CodeBankModule } from 'src/code-bank/codeBank.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserModel } from 'src/database/models/user.model';
import { CodeBankModel } from 'src/database/models/codeBank.model';

import { StudentMiddleware } from 'src/middlewares/student.middleware';

@Module({
  imports: [AuthModule, CodeBankModule],
  controllers: [UserController],
  providers: [UserService, UserModel, CodeBankModel],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StudentMiddleware)
      .forRoutes({ path: 'api/v1/user/wallet', method: RequestMethod.POST });
  }
}
