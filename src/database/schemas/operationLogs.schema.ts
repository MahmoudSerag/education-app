import * as mongoose from 'mongoose';

export const OperationLogsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: 'User',
    },
    lectureId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: 'Lecture',
    },
    purchaseDate: { type: Date, default: Date.now() },
    examTitle: { type: String, required: false },
    examGrade: { type: Number, required: false },
    examDate: { type: Date, required: false },
    succeeded: { type: Boolean, default: false },
    enrolledIn: { type: Boolean, default: true },
  },
  { timestamps: true },
);
