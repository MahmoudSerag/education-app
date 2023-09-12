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
      message: 'Only pdf files allowed',
    });
  }

  public sendErrorResponse(res: Response, statusCode: number, message: string) {
    if (message === 'jwt expired' || message === 'jwt must be provided') {
      statusCode = HttpStatus.UNAUTHORIZED;
      message = "The user's session have expired.";
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
