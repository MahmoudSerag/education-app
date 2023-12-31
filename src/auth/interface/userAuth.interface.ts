import { Document } from 'mongoose';

export interface UserAuthInterface extends Document {
  email: string;
  fullName: string;
  academicYear: number;
  password: string;
  phoneNumber: string;
  sex: 'ذكر' | 'أنثى';
  role: 'admin' | 'moderator' | 'student';
  wallet: number;
  isTokenExpired: boolean;
}
