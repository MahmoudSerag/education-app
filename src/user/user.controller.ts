import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';


@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getUserProfile(@Res({ passthrough: true }) res: Response): object {
    return this.userService.getUserProfile(res);
  }
}
