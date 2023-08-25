import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidVideoUrl', async: false })
export class IsValidVideoUrlConstraint implements ValidatorConstraintInterface {
  validate(url: string) {
    if (typeof url !== 'string') {
      return false;
    }

    return this.isValidYouTubeUrl(url) || this.isValidVimeoUrl(url);
  }

  private isValidYouTubeUrl(url: string): boolean {
    return (
      typeof url === 'string' &&
      (url.includes('youtube.com/watch?v=') || url.includes('youtu.be/'))
    );
  }

  private isValidVimeoUrl(url: string): boolean {
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/(\d+)/;
    return vimeoRegex.test(url);
  }
}

export function IsValidVideoUrl(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidVideoUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidVideoUrlConstraint,
    });
  };
}
