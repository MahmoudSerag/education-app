import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OperationsLogsInterface } from 'src/operation-logs/interface/operationsLogs.interface';

@Injectable()
export class OperationLogsModel {
  constructor(
    @InjectModel('OperationsLogs')
    private readonly operationLogsModel: Model<OperationsLogsInterface>,
  ) {}

  async findPurchasedLecture(
    userId: string,
    lectureId: string,
  ): Promise<OperationsLogsInterface> {
    return await this.operationLogsModel
      .findOne({ userId, lectureId, enrolledIn: true })
      .select('_id')
      .lean();
  }

  async purchaseLecture(userId: string, lectureId: string): Promise<void> {
    await this.operationLogsModel.create({ userId, lectureId });
  }

  async getOperationsLogs(userId: string): Promise<OperationsLogsInterface[]> {
    return await this.operationLogsModel
      .find({ userId })
      .select('purchaseDate lectureId -_id')
      .populate({ path: 'lectureId', select: 'title price _id' })
      .lean();
  }
}
