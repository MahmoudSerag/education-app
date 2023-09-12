import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { userProfile } from 'src/swagger/user/user.swagger';
import {
  apiInternalServerErrorResponse,
  apiUnauthorizedResponse,
} from 'src/swagger/errors.swagger';

@ApiProduces('application/json')
@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOkResponse(userProfile)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  getUserProfile(@Res({ passthrough: true }) res: Response): object {
    return this.userService.getUserProfile(res);
  }
}
