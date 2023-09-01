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
          return value.length === 8;
        },
      },
    },
    price: { type: Number, required: true },
    prefix: { type: String, required: true },
  },
  { timestamps: true },
);
