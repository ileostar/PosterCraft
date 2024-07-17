import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class SendCodeByEmailDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '电子邮件地址不能为空',
  })
  @IsNotEmpty({ message: '电子邮件地址不能为空' })
  @IsEmail({}, { message: '电子邮件地址格式不正确' })
  email: string;
}
