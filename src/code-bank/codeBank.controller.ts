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
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
  apiUnauthorizedResponse,
  apiForbiddenResponse,
} from 'src/helpers/swaggerService.helper';

@ApiProduces('application/json')
@ApiTags('CodeBank')
@Controller('api/v1/code-bank')
export class CodeBankController {
  constructor(private readonly codeBankService: CodeBankService) {}

  @Post()
  @ApiCreatedResponse({
    status: 201,
    description: 'Code Bank',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'تم انشاء عدد 200 كود شراء بقيمة 50 جنيه للكود الواحد',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  createCodeBank(
    @Res({ passthrough: true }) res: Response,
    @Body() body: CodeBankDto,
  ): object {
    return this.codeBankService.createCodeBank(res, body);
  }
}
