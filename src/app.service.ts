import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getSwaggerAPIsGuide(@Res() res: Response): any {
    let nodeEnv;
    if (process.env.NODE_ENV === 'production')
      nodeEnv = process.env.SWAGGER_SERVER_THREE;
    else
      nodeEnv =
        process.env.SWAGGER_SERVER_ONE || process.env.SWAGGER_SERVER_TWO;

    res.status(200).redirect(`${nodeEnv}/apis/docs`);
  }
}
