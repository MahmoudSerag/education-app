import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { resetPasswordDto } from './dto/resetPassword.dto';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import {
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
  apiConflictResponse,
  apiUnauthorizedResponse,
  apiNotAcceptableResponse,
  apiNotFoundResponse,
} from 'src/helpers/swaggerService.helper';

@ApiTags('Auth')
@Controller('/api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    status: 201,
    description: 'User registration',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'User created successfully',
      },
    },
  })
  @ApiConflictResponse(apiConflictResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
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

  @Post('login')
  @ApiCreatedResponse({
    status: 201,
    description: 'User login',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'User created successfully',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiNotAcceptableResponse(apiNotAcceptableResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body() body: loginDto,
  ): object {
    const userAccessToken: string = req.cookies.accessToken;
    return this.authService.login(res, userAccessToken, body);
  }

  @Post('password-reset-step-one')
  @ApiCreatedResponse({
    status: 201,
    description: 'User reset password',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'من فضلك تحقق من حسابك',
      },
    },
  })
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  resetPasswordStepOne(
    @Res({ passthrough: true }) res: Response,
    @Body() body: resetPasswordDto,
  ): object {
    return this.authService.resetPasswordStepOne(res, body);
  }
}
