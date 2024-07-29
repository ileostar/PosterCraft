import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import '@nestjs/common';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { CreateUserDto } from '../../user/dto/user.dto';
import { VerifyPhoneDto } from '../../sms/dto/sms.dto';

/** 默认登录：用户名/邮箱 + 密码 */
export class DefaultLoginDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名或邮箱不能为空,长度为2-20位',
  })
  @IsNotEmpty({ message: '用户名或邮箱不能为空' })
  @Length(2, 20, { message: '用户名长度为2-20位' })
  identifier: string;

  @ApiProperty({
    example: '123456',
    description: '密码不能为空,长度应在6-20位之间',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 20, { message: '密码长度为6-20位' })
  password: string;
}

/** 手机号登录 */
export class PhoneOtpLoginDto extends VerifyPhoneDto {}

/** 注册DTO */
export class RegisterDto extends OmitType(CreateUserDto, [
  'avatar',
  'email',
  'nickname',
  'role',
]) {
  @ApiProperty({
    example: '123456',
    description: '一次性验证码，从短信中获取',
  })
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString({ message: '验证码必须是字符串类型' })
  @Length(6, 6, { message: '验证码应为6位数字' })
  otp: string;
}
