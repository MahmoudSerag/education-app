import * as mongoose from 'mongoose';

export const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  academicYear: { type: Number, enum: [1, 2, 3], required: true },
  description: { type: String, required: true },
});
