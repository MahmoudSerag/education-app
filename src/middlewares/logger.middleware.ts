import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { JWTService } from 'src/helpers/jwtService.helper';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly errorResponse: ErrorResponse,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.cookies || !req.cookies.accessToken)
        return this.errorResponse.handleError(
          res,
          401,
          'Unauthorized: Login first.',
        );

      const decodedToken = this.jwtService.verifyJWT(req.cookies.accessToken);
      res.locals.decodedToken = decodedToken;

      next();
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }
  }
}
