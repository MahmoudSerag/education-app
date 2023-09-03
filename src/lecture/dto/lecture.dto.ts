import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Matches,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { IsValidVideoUrl } from './videoURL.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LectureDto {
  @ApiProperty({
    name: 'title',
    type: String,
    example: 'My Title',
    required: true,
  })
  @Matches(/.*\S.*/, { message: 'title should not be empty' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'imageURL',
    type: String,
    example: 'https://example.com/image.jpg',
    required: true,
  })
  @Matches(/\bhttps?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)\b/, {
    message: 'Invalid image URL.',
  })
  @IsString()
  @IsNotEmpty()
  imageURL: string;

  @ApiProperty({
    name: 'price',
    type: Number,
    example: 250,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    name: 'videoURLs',
    type: Array,
    example: [
      'https://www.youtube.com/watch?v=ctjgMbjvX7U',
      'https://www.youtube.com/watch?v=ctjgMbjvX7U',
    ],
    required: true,
  })
  @IsValidVideoUrl({
    each: true,
    message(validationArguments) {
      let value = validationArguments.value;

      if (!Array.isArray(value)) return 'videoURLs must be an array';

      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] !== 'string' || value[i].length === 0) {
          return 'Array should not include empty values, Only Vimeo and Youtube videos are allowed.';
        } else if (
          !value[i].match(/^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)/) &&
          !value[i].match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
          )
        ) {
          value = `Invalid videoURL: ${value[i]}`;
          break;
        }
      }

      return value;
    },
  })
  @ArrayMinSize(1)
  @IsArray({ message: 'videoURLs must be an array of video URLs.' })
  @IsNotEmpty()
  videoURLs: string[];
}
