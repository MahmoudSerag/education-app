import * as mongoose from 'mongoose';

export const CodeBankSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      validate: {
        validator: function (value: string) {
          return value.length === 16;
        },
      },
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);
