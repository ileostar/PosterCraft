import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class SendCodeBySMSDto {
  @ApiProperty({
    description: '电话号码列表，这里仅为示例，实际可能支持多个号码',
    type: String,
    example: '14709723891',
  })
  readonly phone: string;
}

export class VerifyPhoneDto {
  @ApiProperty({
    example: '14709723891',
    description: '手机号码不能为空,长度应在6-20位之间',
  })
  @IsNotEmpty({ message: '手机号码不能为空' })
  @Length(11, 11, { message: '手机号码应为11位数字' })
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号码格式不正确' })
  phone: string;

  @ApiProperty({
    example: '123456',
    description: '一次性验证码，从短信中获取',
  })
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须是字符串类型' })
  @Length(6, 6, { message: '验证码应为6位数字' })
  otp: string;
}

export class UpdatePhoneDto extends VerifyPhoneDto {}
