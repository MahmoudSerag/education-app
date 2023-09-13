import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { UserModel } from 'src/database/models/user.model';

import { ErrorResponse } from 'src/helpers/errorHandlingService.helper';
import { UpdatedUserDto } from './dto/updatedLecture.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly errorResponse: ErrorResponse,
    private readonly userModel: UserModel,
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
}
