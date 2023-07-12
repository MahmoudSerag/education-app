import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({
    name: 'emailOrPhoneNumber',
    type: String,
    example: '01012345678 || rock@gmail.com',
    required: true,
  })
  @Matches(/^(01[0125][0-9]{8})$|^([^\s@]+@[^\s@]+\.[^\s@]+)$/, {
    message: 'You should enter a valid email or phone number',
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
