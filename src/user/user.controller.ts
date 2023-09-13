import { Body, Controller, Get, Patch, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';

import { validationPipe } from 'src/pipes/validation.pipe';

import { UpdatedUserDto } from './dto/updatedUser.dto';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { updatedUserProfile, userProfile } from 'src/swagger/user/user.swagger';
import {
  apiBadRequestResponse,
  apiInternalServerErrorResponse,
  apiUnauthorizedResponse,
} from 'src/swagger/errors.swagger';
import { UpdatedPasswordDto } from './dto/updatedPassword.dto';

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

  @Patch('profile')
  @ApiOkResponse(updatedUserProfile)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  updateUserProfile(
    @Res({ passthrough: true }) res: Response,
    @Body() body: UpdatedUserDto,
  ): object {
    return this.userService.updateUserProfile(res, body);
  }

  @Patch('password')
  @UsePipes(validationPipe)
  updateUserPassword(
    @Res({ passthrough: true }) res: Response,
    @Body() body: UpdatedPasswordDto,
  ): object {
    return this.userService.updateUserPassword(res, body);
  }
}
