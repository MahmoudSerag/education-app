import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JWTService } from 'src/helpers/jwtService.helper';
import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JWTService,
    private readonly errorResponse: ErrorResponse,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const decodedToken = this.jwtService.verifyJWT(req.cookies.accessToken);
      if (decodedToken.role !== 'admin')
        return this.errorResponse.handleError(res, 403, 'Forbidden');
    } catch (error) {
      return this.errorResponse.handleError(res, 500, error.message);
    }

    next();
  }
}
