import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { CodeBankService } from './codeBank.service';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

import { codeBankDto } from './dto/codeBank.dto';

@Controller('api/v1/code-bank')
export class CodeBankController {
  constructor(
    private readonly errorResponse: ErrorResponse,
    private readonly codeBankService: CodeBankService,
  ) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  createCodeBank(
    @Res({ passthrough: true }) res: Response,
    @Body() body: codeBankDto,
  ): object {
    return this.codeBankService.createCodeBank(res, body);
  }
}
