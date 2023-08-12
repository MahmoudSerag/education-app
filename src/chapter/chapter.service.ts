import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterService {
  getHello(): string {
    return 'Hello World!';
  }
}
