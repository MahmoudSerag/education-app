import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CodeBankInterface } from 'src/code-bank/interface/codeBank.interface';
import { codeBankDto } from 'src/code-bank/dto/codeBank.dto';

@Injectable()
export class CodeBankModel {
  constructor(
    @InjectModel('CodeBank')
    private readonly codeBankModel: Model<CodeBankInterface>,
  ) {}

  async createCodeBank(body: codeBankDto): Promise<void> {
    const codeBank = [];

    for (let i = 0; i < body.numberOfCodes; i++) {
      const min = Math.pow(10, 15);
      const max = Math.pow(10, 16) - 1;
      const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
      codeBank.push({
        code: randomCode,
        price: body.codePrice,
      });
    }

    await this.codeBankModel.insertMany(codeBank);
  }
}
