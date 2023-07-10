import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

import { registerDto } from './dto/register.dto';
import { AuthModel } from 'src/database/models/auth.model';

import { ErrorResponse } from 'src/helpers/errorHandling.helper';
import { PasswordService } from 'src/helpers/passwordService.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly authModel: AuthModel,
    private readonly errorResponse: ErrorResponse,
    private readonly passwordService: PasswordService,
  ) {}
  async register(@Res() res: Response, body: registerDto): Promise<any> {
    try {
      this.errorResponse.validatePasswordAndEmail(body);

      const isEmailExist = await this.authModel.findUserByEmail(body.email);

      if (isEmailExist)
        return this.errorResponse.handleError(
          res,
          400,
          'البريد الالكتروني مسجل بالفعل',
        );

      const isPhoneNumberExist = await this.authModel.findUserByPhoneNumber(
        body.phoneNumber,
      );

      if (isPhoneNumberExist)
        return this.errorResponse.handleError(
          res,
          400,
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
        message: 'تم إنشاء حسابك بنجاح',
      };
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
