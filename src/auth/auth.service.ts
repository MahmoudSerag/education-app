import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { NewPasswordDto } from './dto/newPassword.dto';

import { AuthModel } from 'src/database/models/auth.model';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { PasswordService } from 'src/helpers/passwordService.helper';
import { JWTService } from 'src/helpers/jwtService.helper';
import { EmailService } from 'src/helpers/emailService.helper';
import { CookieService } from 'src/helpers/cookieService.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly authModel: AuthModel,
    private readonly errorResponse: ErrorResponse,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JWTService,
    private readonly emailService: EmailService,
    private readonly cookieService: CookieService,
  ) {}
  async register(
    res: Response,
    body: RegisterDto,
    accessToken: string,
  ): Promise<any> {
    try {
      if (accessToken)
        return this.errorResponse.handleError(res, 406, ', Logout first.');

      if (body.email !== body.confirmedEmail)
        return this.errorResponse.handleError(
          res,
          400,
          'The email and confirmed email do not match',
        );

      if (body.password !== body.confirmedPassword)
        return this.errorResponse.handleError(
          res,
          400,
          'The password and confirmed password do not match',
        );

      const isEmailExist = await this.authModel.findUserByEmail(body.email);

      if (isEmailExist)
        return this.errorResponse.handleError(
          res,
          409,
          'البريد الالكتروني مسجل بالفعل.',
        );

      const isPhoneNumberExist = await this.authModel.findUserByPhoneNumber(
        body.phoneNumber,
      );

      if (isPhoneNumberExist)
        return this.errorResponse.handleError(
          res,
          409,
          'رقم الهاتف مسجل بالفعل.',
        );

      const hashedPassword = await this.passwordService.hashPassword(
        body.password,
      );

      body.password = hashedPassword;
      await this.authModel.CreateNewUser(body);

      return {
        success: true,
        statusCode: 201,
        message: 'User created successfully.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async login(
    res: Response,
    userAccessToken: string,
    body: { emailOrPhoneNumber: string; password: string },
  ): Promise<any> {
    try {
      if (userAccessToken)
        return this.errorResponse.handleError(res, 406, 'Already logged in.');

      const user = await this.authModel.findUserByEmailOrPhoneNumber(
        body.emailOrPhoneNumber,
      );

      if (
        !user ||
        !(await this.passwordService.comparePassword(
          body.password,
          user.password,
        ))
      )
        return this.errorResponse.handleError(
          res,
          401,
          'بيانات المستخدم غير صحيحة.من فضلك حاول مرة اخري.',
        );

      const payload = {
        userId: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      };
      const accessToken = await this.jwtService.signJWT(payload);

      const cookieExpiredAt = new Date(
        Date.now() +
          Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      );
      this.cookieService.setCookie(
        'accessToken',
        accessToken,
        cookieExpiredAt,
        res,
      );

      return {
        success: true,
        statusCode: 201,
        message: 'User logged in successfully.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async resetPasswordStepOne(
    res: Response,
    body: ResetPasswordDto,
    accessToken: string,
  ): Promise<any> {
    try {
      if (accessToken)
        return this.errorResponse.handleError(res, 406, 'Logout first.');

      const user = await this.authModel.findUserByEmail(body.email);

      if (!user)
        return this.errorResponse.handleError(
          res,
          404,
          'المستخدم غير موجود. من فضلك حاول مرة اخري.',
        );

      await this.emailService.senMail(user.email);

      await this.authModel.setTokenExpired(user, false);

      const payload = { email: user.email, userId: user._id };
      const passwordResetToken =
        await this.jwtService.generatePasswordResetToken(payload);

      const cookieExpiredAt = new Date(
        new Date().getTime() +
          Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN) * 60 * 1000,
      );
      this.cookieService.setCookie(
        'userToken',
        passwordResetToken,
        cookieExpiredAt,
        res,
      );

      return {
        success: true,
        statusCode: 201,
        message: 'من فضلك تحقق من حسابك',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async resetPasswordStepTwo(
    res: Response,
    passwordResetToken: string,
  ): Promise<any> {
    try {
      const decodedToken = await this.jwtService.verifyJWT(passwordResetToken);

      const user = await this.authModel.findUserById(decodedToken.userId);

      if (!passwordResetToken || user.isTokenExpired)
        return this.errorResponse.handleError(
          res,
          401,
          "The user's cookies has expired.",
        );

      return {
        success: true,
        statusCode: 201,
        message: "The user's cookies is active",
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async resetPasswordStepThree(
    res: Response,
    passwordResetToken: string,
    body: NewPasswordDto,
  ): Promise<any> {
    try {
      if (body.newPassword !== body.confirmedNewPassword)
        return this.errorResponse.handleError(
          res,
          406,
          'The email and confirmed email do not match.',
        );

      const decodedToken = await this.jwtService.verifyJWT(passwordResetToken);

      const user = await this.authModel.findUserById(decodedToken.userId);

      if (!passwordResetToken || user.isTokenExpired) {
        res.clearCookie('userToken');
        return this.errorResponse.handleError(
          res,
          401,
          "The user's cookies has expired.",
        );
      }

      const hashedPassword = await this.passwordService.hashPassword(
        body.newPassword,
      );

      await this.authModel.createNewPassword(
        decodedToken.email,
        hashedPassword,
      );

      res.clearCookie('userToken');

      return {
        success: true,
        statusCode: 201,
        message: 'The user successfully reset his password.',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  logout(res: Response, accessToken: string): any {
    if (!accessToken)
      return this.errorResponse.handleError(res, 406, 'Already logged out.');

    res.clearCookie('accessToken');

    return {
      success: true,
      statusCode: 201,
      message: 'User logged out successfully.',
    };
  }
}
