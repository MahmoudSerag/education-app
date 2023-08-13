import { Document } from 'mongoose';

export interface ChapterInterface extends Document {
  title: string;
  image: string;
  academicYear: 1 | 2 | 3;
  description: string;
}
