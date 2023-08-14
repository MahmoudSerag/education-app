import { Document } from 'mongoose';

export interface LectureInterface extends Document {
  title: string;
  imageURL: string;
  chapterId: string;
  academicYear: 1 | 2 | 3;
  price: number;
  videoURLs: string[];
  pdfFiles?: string[];
}
