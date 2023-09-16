import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    name: 'emailOrPhoneNumber',
    type: String,
    example: '01012345678 || rock@gmail.com',
    required: true,
  })
  @Matches(/^(01[0125][0-9]{8})$|^([^\s@]+@[^\s@]+\.[^\s@]+)$/, {
    message: 'Invalid email or phone number.',
  })
  @IsNotEmpty()
  emailOrPhoneNumber: string;

  @ApiProperty({
    name: 'password',
    type: String,
    example: '123456AS#@',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
