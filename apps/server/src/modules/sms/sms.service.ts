import { Injectable } from '@nestjs/common';
import {
  SendCodeBySMSDto,
  UpdatePhoneDto,
  VerifyPhoneDto,
} from './dto/sms.dto';
import { generateVerificationCode } from 'src/common/utils';
import { CacheService } from '../cache/cache.service';
import { ResponseData } from 'src/interceptor/responseData';
import Client from 'src/factories/sms';
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
    const code = generateVerificationCode();
    this.cacheService.setCache(dto.phone, code);
    const client = Client.createClient();
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: process.env.SignName,
      templateCode: process.env.TemplateCode,
      phoneNumbers: dto.phone,
      templateParam: JSON.stringify({ code }),
    });
    const runtime = new $Util.RuntimeOptions({});
    await client.sendSmsWithOptions(sendSmsRequest, runtime);
  }

  async verifyPhone(id: string, dto: VerifyPhoneDto) {
    if (!(await this.userService.findUserByPhone(dto.phone)))
      throw '手机号错误';
    const currentCode = await this.cacheService.getCache(dto.phone);
    if (dto.otp !== currentCode) throw '手机验证失败：验证码错误或超时';
  }

  async updatePhone(id: string, dto: UpdatePhoneDto) {
    if (await this.userService.checkPhoneExists(dto.phone))
      throw '手机号已被绑定';
    const currentCode = await this.cacheService.getCache(dto.phone);
    if (dto.otp !== currentCode) throw '手机号更换失败：验证码错误或超时';
    await this.userService.updateUserInfos({
      ...dto,
      userId: id,
    });
  }
}
