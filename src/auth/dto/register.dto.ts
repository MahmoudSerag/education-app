import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsEnum,
  IsEmail,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class registerDto {
  @ApiProperty({
    name: 'fullName',
    type: String,
    example: 'ElBon maher',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    name: 'phoneNumber',
    type: String,
    example: '01012345678',
    required: true,
  })
  @Matches(/^01[0125][0-9]{8}$/, {
    message:
      'Invalid phone number format. Please provide a valid phone number starting with 01 followed by 9 digits.',
  })
  phoneNumber: string;

  @ApiProperty({
    name: 'email',
    type: String,
    example: '8g8dA@example.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'confirmedEmail',
    type: String,
    example: '8g8dA@example.com',
    required: true,
  })
  @IsNotEmpty()
  confirmedEmail: string;

  @ApiProperty({
    name: 'password',
    type: String,
    example: '123456AS#@',
    required: true,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    name: 'confirmedPassword',
    type: String,
    example: '123456AS#@',
    required: true,
  })
  @IsNotEmpty()
  confirmedPassword: string;

  @ApiProperty({
    name: 'academicYear',
    type: Number,
    enum: [1, 2, 3],
    example: 2,
    required: true,
  })
  @IsNumber()
  @IsEnum([1, 2, 3])
  @IsNotEmpty()
  academicYear: number;

  @ApiProperty({
    name: 'sex',
    type: String,
    enum: ['ذكر', 'انثي'],
    example: 'ذكر',
    required: true,
  })
  @IsEnum(['ذكر', 'انثي'])
  @IsNotEmpty()
  sex: string;
}
