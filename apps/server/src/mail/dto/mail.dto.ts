import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class SendCodeByEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '电子邮件地址不能为空',
  })
  @IsNotEmpty({ message: '电子邮件地址不能为空' })
  @IsEmail({}, { message: '电子邮件地址格式不正确' })
  email: string;
}

export class BindEmailDto extends SendCodeByEmailDto {
  @ApiProperty({
    example: 13,
    description: '用户ID不能为空',
  })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number;

  @ApiProperty({
    example: '123456',
    description: '一次性验证码，从邮箱中获取',
  })
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须是字符串类型' })
  @Length(6, 6, { message: '验证码应为6位数字' })
  otp: string;
}
