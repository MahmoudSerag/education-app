import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class NewPasswordDto {
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  confirmedNewPassword: string;
}
