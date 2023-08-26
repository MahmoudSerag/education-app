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

export class lectureDto {
  @ApiProperty({
    name: 'title',
    type: String,
    example: 'My Title',
    required: true,
  })
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
      'https://example.com/video.mp4',
      'https://www.youtube.com/watch?v=ctjgMbjvX7U',
    ],
    required: true,
  })
  @IsValidVideoUrl({
    each: true,
    message(validationArguments) {
      let value = validationArguments.value;

      if (!Array.isArray(value)) value = 'videoURLs must be an array';
      else
        value.map((val: string) => {
          if (!val)
            value =
              'Array should not include empty values, Only Youtube and Vimeo videoURLs are allowed.';
          else if (!val.match(/^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)/))
            value = `Invalid videoURL: ${val}`;
        });

      return value;
    },
  })
  @ArrayMinSize(1)
  @IsArray({ message: 'videoURLs must be an array of video URLs.' })
  @IsNotEmpty()
  videoURLs: string[];
}
