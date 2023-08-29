import {
  Controller,
  Post,
  Body,
  Res,
  UsePipes,
  Req,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';

import { validationPipe } from 'src/pipes/validation.pipe';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { NewPasswordDto } from './dto/newPassword.dto';

import {
  apiBadRequestResponse,
  apiConflictResponse,
  apiInternalServerErrorResponse,
  apiNotAcceptableResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
} from 'src/swagger/errors.swagger';

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
import {
  loginSuccessResponse,
  logoutSuccessResponse,
  passwordResetStepOneSuccessResponse,
  passwordResetStepThreeSuccessResponse,
  passwordResetStepTwoSuccessResponse,
  registrationSuccessResponse,
} from 'src/swagger/auth/auth.swagger';
@ApiProduces('application/json')
@ApiTags('Auth')
@Controller('/api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse(registrationSuccessResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiConflictResponse(apiConflictResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  register(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: RegisterDto,
  ): object {
    const accessToken = req.cookies.accessToken;
    return this.authService.register(res, body, accessToken);
  }

  @Post('login')
  @ApiCreatedResponse(loginSuccessResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiNotAcceptableResponse(apiNotAcceptableResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body() body: LoginDto,
  ): object {
    const accessToken: string = req.cookies.accessToken;
    return this.authService.login(res, accessToken, body);
  }

  @Post('password-reset-step-one')
  @ApiCreatedResponse(passwordResetStepOneSuccessResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  resetPasswordStepOne(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: ResetPasswordDto,
  ): object {
    const accessToken = req.cookies.accessToken;
    return this.authService.resetPasswordStepOne(res, body, accessToken);
  }

  @Get('password-reset-step-two')
  @ApiOkResponse(passwordResetStepTwoSuccessResponse)
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
  @ApiCreatedResponse(passwordResetStepThreeSuccessResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  resetPasswordStepThree(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Body() body: NewPasswordDto,
  ): object {
    const passwordResetToken = req.cookies.userToken;
    return this.authService.resetPasswordStepThree(
      res,
      passwordResetToken,
      body,
    );
  }

  @Post('logout')
  @ApiCreatedResponse(logoutSuccessResponse)
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
