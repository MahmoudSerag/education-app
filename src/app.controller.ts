import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';
@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSwaggerAPIsGuide(@Res() res: Response): any {
    return this.appService.getSwaggerAPIsGuide(res);
  }
}
