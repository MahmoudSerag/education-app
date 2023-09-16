import * as fs from 'fs';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ErrorResponse {
  static validateRequestBody(error: object[]) {
    throw new BadRequestException({
      success: false,
      statusCode: 400,
      message: Object.values(error[0]['constraints'])[0],
    });
  }

  public deleteFiles(
    res: Response,
    files: Array<Express.Multer.File>,
  ): object | void {
    for (const file of files)
      if (file.mimetype === 'application/pdf') fs.unlinkSync(file.path);

    res.status(400).json({
      success: true,
      statusCode: 400,
      message: 'Only pdf files allowed.',
    });
  }

  public sendErrorResponse(res: Response, statusCode: number, message: string) {
    if (
      message === 'jwt expired' ||
      message === 'jwt must be provided' ||
      message === 'jwt malformed'
    ) {
      statusCode = HttpStatus.UNAUTHORIZED;
      message = "The user's session have expired.";
    } else if (message.startsWith('Cast')) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Invalid id.';
    } else if (
      (message.startsWith('Plan') &&
        message.split('{ ')[1].startsWith('phoneNumber')) ||
      (message.startsWith('E11000') &&
        message.split('{ ')[1].startsWith('phoneNumber'))
    ) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Phone number already exists.';
    } else if (
      message.startsWith('E11000') &&
      message.split('{ ')[1].startsWith('email')
    ) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Email already exists.';
    }

    res.status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || 'Internal server error.',
    });
  }
}
