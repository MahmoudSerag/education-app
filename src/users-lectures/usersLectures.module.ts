import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersLecturesSchema } from 'src/database/schemas/usersLectures.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UsersLectures', schema: UsersLecturesSchema },
    ]),
  ],

  exports: [
    MongooseModule.forFeature([
      { name: 'UsersLecturesSchema', schema: UsersLecturesSchema },
    ]),
  ],
})
export class UsersLecturesModule {}
