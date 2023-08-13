import { Injectable } from '@nestjs/common';

import { ChapterModel } from 'src/database/models/chapter.model';
import { chapterDto } from './dto/chapter.dto';
@Injectable()
export class ChapterService {
  constructor(private readonly chapterModel: ChapterModel) {}
  async createNewChapter(body: chapterDto): Promise<any> {
    await this.chapterModel.createNewChapter(body);
    return {
      success: true,
      statusCode: 201,
      message: 'Chapter created successfully.',
    };
  }
}
