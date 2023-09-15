import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OperationLogsSchema } from 'src/database/schemas/operationLogs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'OperationsLogs', schema: OperationLogsSchema },
    ]),
  ],

  exports: [
    MongooseModule.forFeature([
      { name: 'OperationsLogs', schema: OperationLogsSchema },
    ]),
  ],
})
export class OperationLogsModule {}
