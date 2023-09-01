import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CodeBankModel } from 'src/database/models/codeBank.model';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { HelperFunctions } from 'src/helpers/helperFunctions.helper';
import { UploadAndDownloadService } from 'src/helpers/uploadAndDownloadService.helper';

import { CodeBankDto } from './dto/codeBank.dto';

@Injectable()
export class CodeBankService {
  constructor(
    private readonly codeBankModel: CodeBankModel,
    private readonly errorResponse: ErrorResponse,
    private readonly helperFunctions: HelperFunctions,
    private readonly uploadAndDownloadService: UploadAndDownloadService,
  ) {}

  async createCodeBank(res: Response, body: CodeBankDto): Promise<any> {
    try {
      const chargingCodes = this.helperFunctions.generateChargingCodes(body);

      const codesBank = await this.codeBankModel.createCodesBank(chargingCodes);

      await this.uploadAndDownloadService.generateFile(codesBank);

      const fileName = 'Code-Bank.xlsx';
      const fileMimeType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      return this.uploadAndDownloadService.downloadFile(
        res,
        fileName,
        fileMimeType,
      );
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
