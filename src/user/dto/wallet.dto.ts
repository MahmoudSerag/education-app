import { IsString, IsNotEmpty, Matches, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WalletDto {
  @ApiProperty({
    name: 'code',
    type: String,
    example: '999290213790',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'code should not be empty' })
  @IsNumberString()
  @IsString()
  @IsNotEmpty()
  readonly code: string;
}
