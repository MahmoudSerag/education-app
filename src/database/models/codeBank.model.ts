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

  async createCodeBank(
    generatedCodes: { code: string; price: number }[],
  ): Promise<void> {
    const batchSize = 1000;
    const chunks = [];

    for (let i = 0; i < generatedCodes.length; i += batchSize) {
      chunks.push(generatedCodes.slice(i, i + batchSize));
    }

    await Promise.all(
      chunks.map(async (chunk) => {
        await this.codeBankModel.insertMany(chunk, { ordered: false });
      }),
    );
  }

  async deleteCodeBank(): Promise<number> {
    const deletedCodes = await this.codeBankModel.deleteMany();

    return deletedCodes.deletedCount;
  }

  async getChargingCode(code: string): Promise<CodeBankInterface> {
    return this.codeBankModel
      .findOne({ code })
      .select('code price -_id')
      .lean();
  }

  async deleteChargingCode(code: string): Promise<void> {
    await this.codeBankModel.deleteOne({ code }).lean();
  }
}
