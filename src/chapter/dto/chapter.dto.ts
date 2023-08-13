import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';

export class chapterDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum([1, 2, 3], {
    message: 'academicYear must be one of the following values: 1, 2 or 3',
  })
  @IsNumber()
  @IsNotEmpty()
  academicYear: number;

  @Matches(/\bhttps?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)\b/, {
    message: 'Image must be a valid URL',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
