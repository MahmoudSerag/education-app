import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Matches,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { IsValidVideoUrl } from './videoURL.dto';

export class lectureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Matches(/\bhttps?:\/\/\S+\.(?:jpg|jpeg|png|gif|bmp|svg|webp)\b/, {
    message: 'Invalid image URL.',
  })
  @IsString()
  @IsNotEmpty()
  imageURL: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

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
