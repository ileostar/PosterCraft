import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名不能为空,长度为2-20位',
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 20, { message: '用户名长度为2-20位' })
  username: string;

  @ApiProperty({
    example: 'user@example.com',
    description: '电子邮件地址',
  })
  @IsEmail({}, { message: '电子邮件地址格式不正确' })
  email?: string;

  @ApiProperty({
    example: '14709723891',
    description: '手机号码',
  })
  @IsNotEmpty({ message: '手机号码不能为空' })
  @IsString({ message: '手机号码必须是字符串类型' })
  @IsMobilePhone('zh-CN')
  phone?: string;

  @ApiProperty({
    example: '123456',
    description: '密码不能为空,长度应在6-20位之间',
  })
  @Length(6, 20, { message: '密码长度为6-20位' })
  password?: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: '用户头像URL（可选）',
  })
  @IsOptional()
  @IsString({ message: '头像URL必须是字符串类型' })
  avatar?: string;

  @ApiProperty({
    example: 'LeoStar',
    description: '用户昵称（可选）',
  })
  @IsOptional()
  @IsString({ message: '昵称必须是字符串类型' })
  nickname?: string;

  @ApiProperty({
    enum: ['admin', 'normal'],
    example: 'normal',
    description: '用户角色（可选，默认为normal）',
  })
  @IsOptional()
  @IsEnum(['admin', 'normal'], { message: '角色必须是admin或normal之一' })
  role?: 'admin' | 'normal';
}

export class DeleteUserDto {
  @ApiProperty({
    example: 13,
    description: '用户ID不能为空',
  })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number;
}

export class FindUserDto extends PickType(CreateUserDto, ['phone']) {}

export class UpdateUserDto extends OmitType(CreateUserDto, ['username']) {
  @ApiProperty({
    example: 'admin',
    description: '用户名长度为2-20位',
  })
  @Length(2, 20, { message: '用户名长度为2-20位' })
  username?: string;
}

export class BindPhoneDto {
  @ApiProperty({
    example: 13,
    description: '用户ID不能为空',
  })
  @IsNotEmpty({ message: '用户ID不能为空' })
  userId: number;

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
