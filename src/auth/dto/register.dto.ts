import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsEnum,
  IsEmail,
  Matches,
} from 'class-validator';

export class registerDto {
  @IsString({ message: 'يجب أن يكون الاسم مكون من حروف أو نصصوص' })
  @IsNotEmpty({ message: 'لا يمكن أن يكون الاسم فارغًا' })
  fullName: string;

  @Matches(/^0[0-9]{10}$/, {
    message: 'رقم الهاتف  غير صحيح،يجب أن يكون رقم الهاتف مكون من 11 رقم فقط',
  })
  phoneNumber: string;

  @IsEmail(
    {},
    {
      message:
        '(Edyth.Gorczany60@yahoo.com) :يجب أن يكون البريد الالكتروني صحيحاً',
    },
  )
  @IsNotEmpty({ message: 'لا يمكن أن يكون البريد الالكتروني فارغًا' })
  email: string;

  @IsNotEmpty({ message: 'لا يمكن أن يكون البريد الالكتروني التأكيدي فارغًا' })
  confirmedEmail: string;

  @MinLength(6, {
    message: 'يجب أن تكون كلمة المرور الخاصة بك 6 احرف علي الاقل',
  })
  @IsString({
    message:
      'يجب أن تكون كلمة المرور مكونة من حروف او ارقام او حروف و ارقام معاً',
  })
  @IsNotEmpty({ message: 'لا يمكن أن تكون كلمة المرور فارغة' })
  password: string;

  @IsNotEmpty({ message: 'لا يمكن أن تكون كلمة المرور فارغة' })
  confirmedPassword: string;

  @IsNumber({}, { message: 'يجب أن تكون السنة الدراسية رقم وليس نص او حرف' })
  @IsEnum([1, 2, 3], { message: 'يجب أن تكون السنة الدراسية (1, 2, 3)' })
  @IsNotEmpty({ message: 'لا يمكن أن تكون السنة الدراسية فارغة' })
  academicYear: number;

  @IsEnum(['ذكر', 'انثي'], { message: 'يجب أن يكون النوع: (ذكر, انثى)' })
  @IsNotEmpty({ message: 'لا يمكن أن يكون النوع فارغاً' })
  sex: string;
}
