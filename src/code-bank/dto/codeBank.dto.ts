import { IsNotEmpty, IsNumber } from 'class-validator';

export class codeBankDto {
  @IsNumber()
  @IsNotEmpty()
  numberOfCodes: number;

  @IsNumber()
  @IsNotEmpty()
  codePrice: number;
}
