import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

import { CodeBankModel } from 'src/database/models/codeBank.model';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

import { CodeBankDto } from './dto/codeBank.dto';

@Injectable()
export class CodeBankService {
  constructor(
    private readonly codeBankModel: CodeBankModel,
    private readonly errorResponse: ErrorResponse,
  ) {}

  async createCodeBank(@Res() res: Response, body: CodeBankDto): Promise<any> {
    try {
      await this.codeBankModel.createCodeBank(body);

      return {
        success: true,
        statusCode: 201,
        message: `تم انشاء عدد ${body.numberOfCodes} كود شراء بقيمة ${body.codePrice} جنيه للكود الواحد`,
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
