import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedPasswordDto {
  @ApiProperty({
    name: 'oldPassword',
    type: String,
    example: '123456789',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'Old password should not be empty' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    name: 'newPassword',
    type: String,
    example: '123456@#789',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'New password should not be empty' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    name: 'confirmedNewPassword',
    type: String,
    example: '123456@#789',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'Confirmed new password should not be empty' })
  @IsString()
  @IsNotEmpty()
  confirmedNewPassword: string;
}
