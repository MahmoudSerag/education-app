import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { AuthModule } from 'src/auth/auth.module';
import { CodeBankModule } from 'src/code-bank/codeBank.module';
import { LectureModule } from 'src/lecture/lecture.module';
import { ChapterModule } from 'src/chapter/chapter.module';
import { OperationLogsModule } from 'src/operation-logs/operationLogs.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserModel } from 'src/database/models/user.model';
import { CodeBankModel } from 'src/database/models/codeBank.model';
import { LectureModel } from 'src/database/models/lecture.model';
import { ChapterModel } from 'src/database/models/chapter.model';
import { OperationLogsModel } from 'src/database/models/operationLogs.model';

import { StudentMiddleware } from 'src/middlewares/student.middleware';

@Module({
  imports: [
    AuthModule,
    CodeBankModule,
    ChapterModule,
    LectureModule,
    OperationLogsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserModel,
    CodeBankModel,
    ChapterModel,
    LectureModel,
    OperationLogsModel,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StudentMiddleware)
      .forRoutes(
        { path: 'api/v1/user/wallet', method: RequestMethod.POST },
        { path: 'api/v1/user/:lectureId', method: RequestMethod.POST },
      );
  }
}
