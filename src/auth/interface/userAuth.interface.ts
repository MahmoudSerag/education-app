import { Document } from 'mongoose';

enum Sex {
  male,
  female,
}

enum Role {
  admin,
  moderator,
  student,
}

export interface UserAuthInterface extends Document {
  email: string;
  fullName: string;
  academicYear: number;
  password: string;
  phoneNumber: string;
  sex: Sex;
  role: Role;
  isVerified: false;
  wallet: 0;
  linkExpirationDate: Date;
}
