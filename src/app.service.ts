import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getSwaggerAPIsGuide(@Res() res: Response): any {
    let nodeEnv;
    if (process.env.NODE_ENV === 'production')
      nodeEnv = process.env.SWAGGER_SERVER_PRODUCTION;
    else nodeEnv = process.env.SWAGGER_SERVER_DEV;

    res.status(200).redirect(`${nodeEnv}/apis/docs`);
  }
}
