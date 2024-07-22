import { Injectable } from '@nestjs/common';
import { SendCodeBySMSDto } from './dto/sms.dto';
import { generateVerificationCode } from 'src/utils';
import { CacheService } from 'src/cache/cache.service';
import { ResponseData } from '../response/responseFormat';
import Client from 'src/common/sms';
import * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $Util from '@alicloud/tea-util';

@Injectable()
export class SmsService {
  constructor(private cacheService: CacheService) {}
  async sendCodeBySMS(dto: SendCodeBySMSDto) {
    try {
      const code = generateVerificationCode();
      this.cacheService.setCache(dto.phone, code);
      let client = Client.createClient();
      let sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
        signName: process.env.SignName,
        templateCode: process.env.TemplateCode,
        phoneNumbers: dto.phone,
        templateParam: JSON.stringify({ code }),
      });
      let runtime = new $Util.RuntimeOptions({});
      await client.sendSmsWithOptions(sendSmsRequest, runtime);
      return ResponseData.ok(null, '短信发送成功');
    } catch (error) {
      return ResponseData.fail(error.message);
    }
  }
}
