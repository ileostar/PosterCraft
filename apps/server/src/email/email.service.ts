import { Injectable } from '@nestjs/common';
import { SendCodeByEmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  /** 发送邮箱验证码 */
  sendCodeByEmail(dto: SendCodeByEmailDto) {}
}
