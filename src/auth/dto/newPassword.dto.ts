import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class newPasswordDto {
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  confirmedNewPassword: string;
}
