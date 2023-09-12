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

      await this.uploadAndDownloadService.generateFile(chargingCodes, body);

      const fileName = 'Code-Bank.xlsx';
      const fileMimeType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      this.uploadAndDownloadService.downloadFile(res, fileName, fileMimeType);

      return await this.codeBankModel.createCodeBank(chargingCodes);
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }

  async deleteCodeBank(res: Response): Promise<any> {
    try {
      const deletedCount = await this.codeBankModel.deleteCodeBank();

      if (!deletedCount)
        return this.errorResponse.sendErrorResponse(
          res,
          404,
          'No codes to delete.',
        );

      return {
        success: true,
        statusCode: 200,
        message: 'Code Bank deleted successfully',
      };
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }
}
