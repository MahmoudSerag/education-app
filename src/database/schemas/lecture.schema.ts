import * as mongoose from 'mongoose';

export const LectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageURL: { type: String, required: true },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      required: true,
      ref: 'Chapter',
    },
    academicYear: { type: Number, enum: [1, 2, 3], required: true },
    price: { type: Number, required: true },
    videoURLs: { type: [String], required: true },
    pdfFiles: { type: [String], required: false },
  },
  { timestamps: true },
);
