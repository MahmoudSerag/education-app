import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    academicYear: {
      type: Number,
      index: true,
      enum: [1, 2, 3],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sex: {
      type: String,
      enum: ['ذكر', 'انثي'],
      required: true,
    },
    role: {
      type: String,
      index: true,
      enum: ['admin', 'moderator', 'student'],
      default: 'student',
    },
    wallet: {
      type: Number,
      default: 0,
    },
    isTokenExpired: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
