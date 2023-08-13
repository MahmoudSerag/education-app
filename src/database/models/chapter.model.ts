import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { chapterDto } from 'src/chapter/dto/chapter.dto';
import { ChapterInterface } from 'src/chapter/interface/chapter.interface';

@Injectable()
export class ChapterModel {
  constructor(
    @InjectModel('Chapter')
    private readonly chapterModel: Model<ChapterInterface>,
  ) {}

  async createNewChapter(body: chapterDto): Promise<void> {
    await this.chapterModel.create(body);
  }
}
