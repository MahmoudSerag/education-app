import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeBankModel } from 'src/database/models/codeBank.model';

import { CodeBankController } from './codeBank.controller';
import { CodeBankService } from './codeBank.service';

import { CodeBankSchema } from 'src/database/schemas/codeBank.schema';

import { UploadAndDownloadService } from 'src/helpers/uploadAndDownloadService.helper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CodeBank', schema: CodeBankSchema }]),
  ],
  controllers: [CodeBankController],
  providers: [CodeBankService, CodeBankModel, UploadAndDownloadService],
})
export class CodeBankModule {}
