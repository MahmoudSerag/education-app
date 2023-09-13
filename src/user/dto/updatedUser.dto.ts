import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedUserDto {
  @ApiProperty({
    name: 'fullName',
    type: String,
    example: 'Ahmed Mohamed Ali',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'title should not be empty' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    name: 'phoneNumber',
    type: String,
    example: '01234567898',
    required: true,
  })
  @Matches(/^01[0125][0-9]{8}$/, {
    message:
      'Invalid phone number format. Please provide a valid phone number starting with 01 followed by 9 digits.',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    name: 'academicYear',
    type: Number,
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
    example: 'ذكر',
    required: true,
  })
  @IsEnum(['ذكر', 'انثي'])
  @IsNotEmpty()
  sex: string;
}
