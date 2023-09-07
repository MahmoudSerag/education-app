import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewPasswordDto {
  @ApiProperty({
    name: 'New password',
    type: String,
    example: '123456AS#@',
    required: true,
  })
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    name: 'Confirmed new password',
    type: String,
    example: '123456AS#@',
    required: true,
  })
  @IsNotEmpty()
  confirmedNewPassword: string;
}
