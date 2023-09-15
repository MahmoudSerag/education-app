import { Document } from 'mongoose';

export interface OperationsLogsInterface extends Document {
  userId: string;
  lectureId: string;
  purchaseDate: Date;
  examTitle: string;
  examGrade: number;
  examDate: Date;
  succeeded: boolean;
  enrolledIn: boolean;
}
