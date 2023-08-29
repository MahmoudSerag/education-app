import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CodeBankDto {
  @ApiProperty({
    name: 'numberOfCodes',
    type: Number,
    example: 50,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  numberOfCodes: number;

  @ApiProperty({
    name: 'codePrice',
    type: Number,
    example: 200,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  codePrice: number;
}
