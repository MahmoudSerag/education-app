import { Document } from 'mongoose';

export interface CodeBankInterface extends Document {
  code: string;
  price: number;
  prefix: string;
}
