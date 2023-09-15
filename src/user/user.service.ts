import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { UserModel } from 'src/database/models/user.model';

import { PasswordService } from 'src/helpers/passwordService.helper';
import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';

import { UpdatedUserDto } from './dto/updatedUser.dto';
import { UpdatedPasswordDto } from './dto/updatedPassword.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly errorResponse: ErrorResponse,
    private readonly userModel: UserModel,
    private readonly passwordService: PasswordService,
  ) {}

  async getUserProfile(res: Response): Promise<any> {
    try {
      const userId = res.locals.decodedToken.userId;

      const userProfile = await this.userModel.getUserById(userId);

      return {
        success: true,
        statusCode: 200,
        message: 'User profile fetched successfully',
        userProfile: {
          _id: userProfile._id,
          email: userProfile.email,
          fullName: userProfile.fullName,
          academicYear: userProfile.academicYear,
          phoneNumber: userProfile.phoneNumber,
          sex: userProfile.sex,
          wallet: userProfile.wallet,
        },
      };
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error);
    }
  }

  async updateUserProfile(res: Response, body: UpdatedUserDto): Promise<any> {
    try {
      const userId = res.locals.decodedToken.userId;

      await this.userModel.updateUserById(userId, body);

      return {
        success: true,
        statusCode: 200,
        message: 'User profile updated successfully',
      };
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }

  async updateUserPassword(
    res: Response,
    body: UpdatedPasswordDto,
  ): Promise<any> {
    try {
      if (body.newPassword !== body.confirmedNewPassword)
        return this.errorResponse.sendErrorResponse(
          res,
          406,
          'The password and confirmed password do not match.',
        );

      const userId = res.locals.decodedToken.userId;

      const user = await this.userModel.getUserById(userId);

      if (
        !(await this.passwordService.comparePassword(
          body.oldPassword,
          user.password,
        ))
      )
        return this.errorResponse.sendErrorResponse(
          res,
          403,
          'Enter a valid old password.',
        );

      user.password = await this.passwordService.hashPassword(body.newPassword);

      await this.userModel.updateUserPassword(user);

      return {
        success: true,
        statusCode: 200,
        message: 'Password updated successfully',
      };
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }

  async chargeWallet(res: Response, code: string): Promise<any> {
    try {
      const userId = res.locals.decodedToken.userId;

      const foundedCode = await this.userModel.getChargingCode(code);

      if (!foundedCode)
        return this.errorResponse.sendErrorResponse(
          res,
          404,
          'The charging code does not exist.',
        );

      await Promise.all([
        this.userModel.chargeCode(userId, foundedCode.price),
        this.userModel.deleteChargingCode(code),
      ]);

      return {
        success: true,
        statusCode: 201,
        message: 'Wallet charged successfully',
      };
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }

  async purchaseLecture(res: Response, lectureId: string): Promise<any> {
    try {
      const userId = res.locals.decodedToken.userId;

      const [lecture, purchasedLecture, user] = await Promise.all([
        this.userModel.getLectureById(lectureId),
        this.userModel.findPurchasedLecture(userId, lectureId),
        this.userModel.getUserById(userId),
      ]);

      if (!lecture)
        return this.errorResponse.sendErrorResponse(
          res,
          404,
          'Lecture not found.',
        );

      if (purchasedLecture)
        return this.errorResponse.sendErrorResponse(
          res,
          403,
          'Lecture already purchased.',
        );

      if (lecture.price > user.wallet)
        return this.errorResponse.sendErrorResponse(
          res,
          403,
          'Not enough money.',
        );

      await Promise.all([
        this.userModel.purchaseLecture(userId, lectureId),
        this.userModel.updateUserWallet(userId, -lecture.price),
      ]);

      return {
        success: true,
        statusCode: 201,
        message: 'Lecture purchased successfully',
      };
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }

  async getUserOperationsLogs(res: Response): Promise<any> {
    try {
      const userId = res.locals.decodedToken.userId;

      const userOperationsLogs = await this.userModel.getUserOperationsLogs(
        userId,
      );

      if (!userOperationsLogs)
        return this.errorResponse.sendErrorResponse(
          res,
          404,
          'User operations logs not found.',
        );

      return {
        success: true,
        statusCode: 200,
        message: 'User operations logs fetched successfully',
        userOperationsLogs,
      };
    } catch (error) {
      return this.errorResponse.sendErrorResponse(res, 500, error.message);
    }
  }
}
