import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeBankModel } from 'src/database/models/codeBank.model';

import { CodeBankController } from './codeBank.controller';
import { CodeBankService } from './codeBank.service';

import { CodeBankSchema } from 'src/database/schemas/codeBank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CodeBank', schema: CodeBankSchema }]),
  ],
  controllers: [CodeBankController],
  providers: [CodeBankService, CodeBankModel],
  exports: [
    MongooseModule.forFeature([{ name: 'CodeBank', schema: CodeBankSchema }]),
  ],
})
export class CodeBankModule {}
