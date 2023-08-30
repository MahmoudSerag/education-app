import * as fs from 'fs';
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

  public deleteFiles(files: Array<Express.Multer.File>): object | void {
    let isPDFFound = false;
    for (const file of files)
      if (file.mimetype !== 'application/pdf') {
        isPDFFound = true;
        break;
      }

    if (isPDFFound)
      for (const file of files)
        if (file.mimetype === 'application/pdf') fs.unlinkSync(file.path);

    return {
      success: false,
      statusCode: 400,
      message: 'Only PDF files are allowed.',
    };
  }

  public deletePDFFiles(pdfFilesPaths: string[]): void {
    for (const pdfFile of pdfFilesPaths) fs.unlinkSync(pdfFile);
  }

  public validatePasswordAndEmail(body: {
    email: string;
    password: string;
    confirmedPassword: string;
    confirmedEmail: string;
  }): void {
    if (body.email !== body.confirmedEmail)
      throw new BadRequestException({
        success: false,
        statusCode: 400,
        message: 'The email and confirmed email do not match',
      });

    if (body.password !== body.confirmedPassword)
      throw new BadRequestException({
        success: false,
        statusCode: 400,
        message: 'The password and confirmed password do not match',
      });
  }

  public handleError(
    @Res() res: Response,
    statusCode: number,
    message: string,
  ) {
    if (message === 'jwt expired' || message === 'jwt must be provided') {
      statusCode = HttpStatus.UNAUTHORIZED;
      message = "The user's cookies have expired.";
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
