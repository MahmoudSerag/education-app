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
      enum: ['male', 'female'],
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'student'],
      default: 'student',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    verificationLink: {
      type: String,
      required: true,
    },
    linkExpirationDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);
