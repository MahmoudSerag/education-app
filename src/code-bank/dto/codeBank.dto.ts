import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
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

  @ApiProperty({
    name: 'prefix',
    type: Number,
    example: 'KT1',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'OldPassword should not be empty' })
  @IsString()
  @IsNotEmpty()
  prefix: string;
}
