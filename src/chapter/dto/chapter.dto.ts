import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChapterDto {
  @ApiProperty({
    name: 'title',
    type: String,
    example: 'Modern physics.',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'title should not be empty' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'academicYear',
    type: Number,
    example: 2,
    required: true,
  })
  @IsEnum([1, 2, 3], {
    message: 'academicYear must be one of the following values: 1, 2 or 3',
  })
  @IsNumber()
  @IsNotEmpty()
  academicYear: number;

  @ApiProperty({
    name: 'imageURL',
    type: Number,
    example: 'https://i.ibb.co/mSq8k9B/istockphoto-1023966316-1024x1024.jpg',
    required: true,
  })
  @Matches(/\bhttps?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)\b/, {
    message: 'Image must be a valid URL',
  })
  @IsString()
  @IsNotEmpty()
  imageURL: string;

  @ApiProperty({
    name: 'description',
    type: String,
    example: 'This is an important chapter to explain logic gates.',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'description should not be empty' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
