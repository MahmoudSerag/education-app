import { Body, Controller, Delete, Post, Res, UsePipes } from '@nestjs/common';
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
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  apiBadRequestResponse,
  apiInternalServerErrorResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
  apiNotFoundResponse,
} from 'src/swagger/errors.swagger';
import {
  createdCodeBankResponse,
  deletedCodeBankResponse,
} from 'src/swagger/code-bank/codeBank.swagger';

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

  @Delete()
  @ApiOkResponse(deletedCodeBankResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  deleteCodeBank(@Res({ passthrough: true }) res: Response): object {
    return this.codeBankService.deleteCodeBank(res);
  }
}
