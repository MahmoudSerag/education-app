import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class UpdatedUserDto {
  @Matches(/.*\S.*/, { message: 'title should not be empty' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Matches(/^01[0125][0-9]{8}$/, {
    message:
      'Invalid phone number format. Please provide a valid phone number starting with 01 followed by 9 digits.',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsNumber()
  @IsEnum([1, 2, 3])
  @IsNotEmpty()
  academicYear: number;

  @IsEnum(['ذكر', 'انثي'])
  @IsNotEmpty()
  sex: string;
}
