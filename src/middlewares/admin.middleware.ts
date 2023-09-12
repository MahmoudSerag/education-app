import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(private readonly errorResponse: ErrorResponse) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const decodedToken = res.locals.decodedToken;

      if (decodedToken.role !== 'admin')
        return this.errorResponse.sendErrorResponse(
          res,
          403,
          'Forbidden: Should login as admin.',
        );

      next();
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }
}
