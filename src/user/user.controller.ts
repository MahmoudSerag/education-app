import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';

import { validationPipe } from 'src/pipes/validation.pipe';

import { UpdatedUserDto } from './dto/updatedUser.dto';
import { UpdatedPasswordDto } from './dto/updatedPassword.dto';
import { WalletDto } from './dto/wallet.dto';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  updatedUserProfile,
  userProfile,
  updatedUserPassword,
  chargedWallet,
  purchasedLecture,
} from 'src/swagger/user/user.swagger';
import {
  apiBadRequestResponse,
  apiForbiddenResponse,
  apiInternalServerErrorResponse,
  apiNotFoundResponse,
  apiUnauthorizedResponse,
} from 'src/swagger/errors.swagger';
import { updatedLectureParam } from 'src/swagger/lectures/lecture.swagger';

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
  @ApiOkResponse(updatedUserPassword)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  updateUserPassword(
    @Res({ passthrough: true }) res: Response,
    @Body() body: UpdatedPasswordDto,
  ): object {
    return this.userService.updateUserPassword(res, body);
  }

  @Post('wallet')
  @ApiCreatedResponse(chargedWallet)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  @UsePipes(validationPipe)
  chargeWallet(
    @Res({ passthrough: true }) res: Response,
    @Body() body: WalletDto,
  ): object {
    return this.userService.chargeWallet(res, body.code);
  }

  @Post(':lectureId')
  @ApiParam(updatedLectureParam)
  @ApiCreatedResponse(purchasedLecture)
  @ApiBadRequestResponse(apiBadRequestResponse)
  @ApiUnauthorizedResponse(apiUnauthorizedResponse)
  @ApiForbiddenResponse(apiForbiddenResponse)
  @ApiNotFoundResponse(apiNotFoundResponse)
  @ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
  purchaseLecture(
    @Res({ passthrough: true }) res: Response,
    @Param('lectureId') lectureId: string,
  ): object {
    return this.userService.purchaseLecture(res, lectureId);
  }

  @Get('operationsLogs')
  getUserOperationsLogs(@Res({ passthrough: true }) res: Response): object {
    return this.userService.getUserOperationsLogs(res);
  }
}
