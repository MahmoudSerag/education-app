import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsEnum,
  IsEmail,
  Matches,
} from 'class-validator';

export class registerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Matches(/^0[0-9]{10}$/, {
    message:
      'Invalid phone number format. Please provide a valid phone number starting with 0 followed by 10 digits.',
  })
  phoneNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  confirmedEmail: string;

  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmedPassword: string;

  @IsNumber()
  @IsEnum([1, 2, 3])
  @IsNotEmpty()
  academicYear: number;

  @IsEnum(['ذكر', 'انثي'])
  @IsNotEmpty()
  sex: string;
}
