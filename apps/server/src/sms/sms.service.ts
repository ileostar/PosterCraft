import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import SMSClient from '@alicloud/sms-sdk';
import { SMSClientConfig, SMSSendConfig } from '../config/sms';
import { SendCodeBySMSDto } from './dto/sms.dto';
import { generateVerificationCode } from 'src/utils';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class SmsService {
  constructor(private cacheService: CacheService) {}
  async sendCodeBySMS(dto: SendCodeBySMSDto) {
    try {
      const code = generateVerificationCode();
      const smsClient = new SMSClient(SMSClientConfig);
      this.cacheService.setCache(dto.phone, code);
      const res = smsClient.sendSMS(
        {
          PhoneNumbers: dto.phone,
          SignName: SMSSendConfig.SignName,
          TemplateCode: SMSSendConfig.TemplateCode,
          TemplateParam: JSON.stringify({ code }),
        },
        { method: 'POST' },
      );
      return res.Code === 'OK' ? res : false;
    } catch (error) {
      new HttpException('sendCodeBySMS error', HttpStatus.BAD_REQUEST);
    }
  }
}
