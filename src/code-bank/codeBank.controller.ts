import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';

import { validationPipe } from 'src/pipes/validation.pipe';

import { CodeBankService } from './codeBank.service';

import { CodeBankDto } from './dto/codeBank.dto';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiForbiddenResponse,
  ApiProduces,
} from '@nestjs/swagger';
import {
  apiBadRequestResponse,
  apiInternalServerErrorResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
} from 'src/swagger/errors.swagger';
import { createdCodeBankResponse } from 'src/swagger/code-bank/codeBank.swagger';

@ApiProduces('application/json')
@ApiTags('CodeBank')
@Controller('api/v1/code-bank')
export class CodeBankController {
  constructor(private readonly codeBankService: CodeBankService) {}

  @Post()
  @ApiCreatedResponse(createdCodeBankResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  createCodeBank(
    @Res({ passthrough: true }) res: Response,
    @Body() body: CodeBankDto,
  ): object {
    return this.codeBankService.createCodeBank(res, body);
  }
}
