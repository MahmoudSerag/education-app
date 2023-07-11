import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

import { registerDto } from './dto/register.dto';
import { AuthModel } from 'src/database/models/auth.model';

import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { PasswordService } from 'src/helpers/passwordService.helper';
import { JWTService } from 'src/helpers/jwtService.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly authModel: AuthModel,
    private readonly errorResponse: ErrorResponse,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JWTService,
  ) {}
  async register(@Res() res: Response, body: registerDto): Promise<any> {
    try {
      this.errorResponse.validatePasswordAndEmail(body);

      const isEmailExist = await this.authModel.findUserByEmail(body.email);

      if (isEmailExist)
        return this.errorResponse.handleError(
          res,
          409,
          'البريد الالكتروني مسجل بالفعل',
        );

      const isPhoneNumberExist = await this.authModel.findUserByPhoneNumber(
        body.phoneNumber,
      );

      if (isPhoneNumberExist)
        return this.errorResponse.handleError(
          res,
          409,
          'رقم الهاتف مسجل بالفعل',
        );

      const hashedPassword = await this.passwordService.hashPassword(
        body.password,
      );

      body.password = hashedPassword;
      await this.authModel.CreateNewUser(body);

      return {
        success: true,
        statusCode: 201,
        message: 'User created successfully',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }

  async login(
    @Res() res: Response,
    userAccessToken: string,
    body: { emailOrPhoneNumber: string; password: string },
  ): Promise<any> {
    try {
      if (userAccessToken)
        return this.errorResponse.handleError(res, 406, 'Already logged in');

      const user = await this.authModel.findUserByEmailOrPhoneNumber(
        body.emailOrPhoneNumber,
      );

      if (!user)
        return this.errorResponse.handleError(
          res,
          401,
          'بيانات المستخدم غير صحيحة.من فضلك حاول مرة اخري',
        );

      const isPasswordCorrect = await this.passwordService.comparePassword(
        body.password,
        user.password,
      );

      if (!isPasswordCorrect)
        return this.errorResponse.handleError(
          res,
          401,
          'بيانات المستخدم غير صحيحة. من فضلك حاول مرة اخري',
        );

      const payload = {
        userId: user._id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      };
      const accessToken = await this.jwtService.signJWT(payload);

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(
          Date.now() +
            Number(process.env.COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
        ),
      });

      return {
        success: true,
        statusCode: 201,
        message: 'User logged in successfully',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
