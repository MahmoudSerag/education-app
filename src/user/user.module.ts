import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserModel } from 'src/database/models/user.model';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, UserModel],
})
export class UserModule {}
