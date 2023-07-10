import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

import { registerDto } from './dto/register.dto';

import { ErrorResponse } from 'src/helpers/errorHandling.helper';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  register(
    @Res({ passthrough: true }) res: Response,
    @Body() body: registerDto,
  ): object {
    return this.authService.register(res, body);
  }
}
