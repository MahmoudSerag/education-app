import * as mongoose from 'mongoose';

export const CodeBankSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);
