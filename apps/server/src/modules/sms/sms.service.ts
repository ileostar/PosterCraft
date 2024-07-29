import { Injectable } from '@nestjs/common';
import {
  SendCodeBySMSDto,
  UpdatePhoneDto,
  VerifyPhoneDto,
} from './dto/sms.dto';
import { generateVerificationCode } from 'src/common/utils';
import { CacheService } from '../cache/cache.service';
import { ResponseData } from 'src/response/responseFormat';
import Client from 'src/common/sms';
import * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
import * as $Util from '@alicloud/tea-util';
import { UserService } from '../user/user.service';

@Injectable()
export class SmsService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {}
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

  async verifyPhone(id: number, dto: VerifyPhoneDto) {
    try {
      if (!(await this.userService.findUserByPhone(dto.phone)))
        return ResponseData.ok(null, '手机号错误');
      const currentCode = await this.cacheService.getCache(dto.phone);
      if (dto.otp === currentCode) return ResponseData.ok(null, '手机验证成功');
      else return ResponseData.ok(null, '手机验证失败：验证码错误或超时');
    } catch (error) {
      return ResponseData.fail('校验失败：' + error);
    }
  }

  async updatePhone(id: number, dto: UpdatePhoneDto) {
    try {
      if (await this.userService.checkPhoneExists(dto.phone))
        return ResponseData.fail('手机号已被绑定');
      const currentCode = await this.cacheService.getCache(dto.phone);
      if (dto.otp === currentCode) {
        await this.userService.updateUserInfos({
          ...dto,
          userId: id,
        });
        return ResponseData.ok(null, '手机号更换成功');
      } else return ResponseData.ok(null, '手机号更换失败：验证码错误或超时');
    } catch (error) {
      return ResponseData.fail('校验失败：' + error);
    }
  }
}
