import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CodeBankInterface } from 'src/code-bank/interface/codeBank.interface';

@Injectable()
export class CodeBankModel {
  constructor(
    @InjectModel('CodeBank')
    private readonly codeBankModel: Model<CodeBankInterface>,
  ) {}

  async createCodesBank(
    generatedCodes: object[],
  ): Promise<{ code: string; price: number }[]> {
    return (await this.codeBankModel.insertMany(generatedCodes)).map((doc) => ({
      code: `${doc.prefix}-${doc.code}`,
      price: doc.price,
    }));
  }
}
