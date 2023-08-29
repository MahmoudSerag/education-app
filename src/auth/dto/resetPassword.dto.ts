import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    name: 'email',
    type: String,
    example: 'rock@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
