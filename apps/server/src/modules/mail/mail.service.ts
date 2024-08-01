import { Injectable } from '@nestjs/common';
import {
  SendCodeByEmailDto,
  BindEmailDto,
  VerifyEmailDto,
} from './dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { generateVerificationCode } from 'src/common/utils';
import { ResponseData } from 'src/interceptor/responseData';
import { CacheService } from '../cache/cache.service';
import { UserService } from '../user/user.service';
import { projectConfig } from 'src/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {}

  private async sendMail(
    email: string,
    code: number | string,
    subject: string = 'PosterCraft Email',
    template: string = 'index',
    url: string = projectConfig.projectName,
  ) {
    return this.mailerService.sendMail({
      to: email,
      subject,
      template,
      context: {
        code,
        url,
      },
    });
  }

  async sendCodeByMail(dto: SendCodeByEmailDto) {
    try {
      const code = generateVerificationCode();
      await this.cacheService.setCache(dto.email, code);
      const res = await this.sendMail(dto.email, code);
      return ResponseData.ok(res, '邮箱验证码发送成功');
    } catch (error) {
      return ResponseData.fail('邮箱验证码发送失败:' + error);
    }
  }

  async bindMail(id: string, dto: BindEmailDto) {
    try {
      if (!(await this.userService.findUserByUserId(id)))
        return ResponseData.ok(null, '用户ID不存在');

      const currentCode = await this.cacheService.getCache(dto.email);

      if (dto.otp === currentCode) {
        await this.cacheService.delCache(dto.email);
        if (await this.userService.findUserByEmail(dto.email))
          return ResponseData.ok(null, '邮箱已存在');

        await this.userService.updateUserInfos({
          ...dto,
          userId: id,
        });
        return ResponseData.ok(null, '邮箱绑定成功');
      } else return ResponseData.ok(null, '邮箱绑定失败：验证码错误或超时');
    } catch (error) {
      return ResponseData.fail('邮箱绑定失败：' + error);
    }
  }

  async updateEmail(id: string, dto: BindEmailDto) {
    try {
      if (await this.userService.checkEmailExists(dto.email))
        return ResponseData.fail('邮箱已被绑定');
      const currentCode = await this.cacheService.getCache(dto.email);
      if (dto.otp === currentCode) {
        await this.cacheService.delCache(dto.email);
        if (!(await this.userService.findUserByEmail(dto.email)))
          return ResponseData.ok(null, '用户未绑定邮箱');

        await this.userService.updateUserInfos({
          ...dto,
          userId: id,
        });
        return ResponseData.ok(null, '邮箱绑定成功');
      } else return ResponseData.ok(null, '邮箱绑定失败：验证码错误或超时');
    } catch (error) {
      return ResponseData.fail('邮箱绑定失败：' + error);
    }
  }

  async verifyEmail(dto: VerifyEmailDto) {
    try {
      if (await this.userService.checkEmailExists(dto.email))
        return ResponseData.fail('用户邮箱不存在');
      const currentCode = await this.cacheService.getCache(dto.email);

      if (dto.otp === currentCode) {
        await this.cacheService.delCache(dto.email);
        return ResponseData.ok(null, '邮箱绑定成功');
      } else return ResponseData.ok(null, '邮箱绑定失败：验证码错误或超时');
    } catch (error) {
      return ResponseData.fail('邮箱绑定失败：' + error);
    }
  }
}
