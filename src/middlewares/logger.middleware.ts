import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies || !req.cookies.accessToken)
      throw new UnauthorizedException({
        success: false,
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized.',
      });

    res.locals.accessToken = req.cookies.accessToken;

    next();
  }
}
