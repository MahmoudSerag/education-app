import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  ValidationPipe,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiProduces,
} from '@nestjs/swagger';

import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { resetPasswordDto } from './dto/resetPassword.dto';
import { newPasswordDto } from './dto/newPassword.dto';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import {
  apiInternalServerErrorResponse,
  apiBadRequestResponse,
  apiConflictResponse,
  apiUnauthorizedResponse,
  apiNotAcceptableResponse,
  apiNotFoundResponse,
} from 'src/helpers/swaggerService.helper';
@ApiProduces('application/json')
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
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: registerDto,
  ): object {
    const accessToken = req.cookies.accessToken;
    return this.authService.register(res, body, accessToken);
  }

  @Post('login')
  @ApiCreatedResponse({
    status: 201,
    description: 'User login',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'User logged in successfully',
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
    const accessToken: string = req.cookies.accessToken;
    return this.authService.login(res, accessToken, body);
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

  @Get('password-reset-step-two')
  @ApiOkResponse({
    status: 200,
    description: 'User reset password step two',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: "The user's session is active",
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  resetPasswordStepTwo(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): object {
    const passwordResetToken = req.cookies.userToken;
    return this.authService.resetPasswordStepTwo(res, passwordResetToken);
  }

  @Post('password-reset-step-three')
  @ApiCreatedResponse({
    status: 201,
    description: 'User reset password step three',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'The user successfully reset his password',
      },
    },
  })
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(
    new ValidationPipe({
      exceptionFactory(error: object[]) {
        ErrorResponse.validateRequestBody(error);
      },
    }),
  )
  resetPasswordStepThree(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body() body: newPasswordDto,
  ): object {
    const passwordResetToken = req.cookies.userToken;
    return this.authService.resetPasswordStepThree(
      res,
      passwordResetToken,
      body,
    );
  }

  @Post('logout')
  @ApiCreatedResponse({
    status: 201,
    description: 'User logout',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'User logged out successfully',
      },
    },
  })
  @ApiNotAcceptableResponse(apiNotAcceptableResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): object {
    const accessToken = req.cookies.accessToken;
    return this.authService.logout(res, accessToken);
  }
}
