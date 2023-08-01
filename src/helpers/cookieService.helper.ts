import { Res } from '@nestjs/common';
import { Response } from 'express';

export class CookieService {
  public setCookie(
    cookieName: string,
    cookieValue: string,
    expirationDate: Date,
    @Res() res: Response,
  ): void {
    res.cookie(cookieName, cookieValue, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: expirationDate,
    });
  }
}
