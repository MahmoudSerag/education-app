import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModel } from 'src/database/models/auth.model';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserSchema } from 'src/database/schemas/user.schema';
import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { PasswordService } from 'src/helpers/passwordService.helper';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, AuthModel, ErrorResponse, PasswordService],
  exports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class AuthModule {}
