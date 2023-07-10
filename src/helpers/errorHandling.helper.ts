import { BadRequestException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export class ErrorResponse {
  static validateRequestBody(error: object[]) {
    throw new BadRequestException({
      success: false,
      statusCode: 400,
      message: Object.values(error[0]['constraints'])[0],
    });
  }

  public validatePasswordAndEmail(body: any) {
    if (body.email !== body.confirmedEmail) {
      throw new BadRequestException({
        success: false,
        statusCode: 400,
        message: 'البريد الالكتروني وتأكيد البريد الالكتروني غير متطابقين',
      });
    }

    if (body.password !== body.confirmedPassword) {
      throw new BadRequestException({
        success: false,
        statusCode: 400,
        message: 'كلمة المرور وتأكيد كلمة المرور غير متطابقين',
      });
    }
  }

  public handleError(
    @Res() res: Response,
    statusCode: number,
    message: string,
  ) {
    if (message === 'jwt expired') {
      statusCode = HttpStatus.UNAUTHORIZED;
      message = 'JWT Expired.';
    }

    if (message.startsWith('Cast')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Invalid id.';
    }

    res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || 'Internal server error.',
    });
  }
}
