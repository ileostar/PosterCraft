import { Injectable } from '@nestjs/common';
import { SendCodeByEmailDto, BindEmailDto } from './dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { generateVerificationCode } from '../utils';
import { ResponseData } from 'src/response/responseFormat';
import { CacheService } from 'src/cache/cache.service';
import { UserService } from 'src/user/user.service';

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
    url: string = process.env.Project_URL,
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

  /** 发送邮箱验证码 */
  async sendCodeByMail(dto: SendCodeByEmailDto) {
    try {
      const code = generateVerificationCode();
      this.cacheService.setCache(dto.email, code);
      const res = await this.sendMail(dto.email, code);
      return ResponseData.ok(res, '邮箱验证码发送成功');
    } catch (error) {
      return ResponseData.fail('邮箱验证码发送失败:' + error);
    }
  }

  async bindMail(dto: BindEmailDto) {
    try {
      if (!this.userService.findUserByUserId(dto.userId))
        return ResponseData.ok(null, '用户ID不存在');

      const currentCode = await this.cacheService.getCache(dto.email);

      if (dto.otp === currentCode) {
        this.cacheService.delCache(dto.email);
        if (this.userService.findUserByEmail(dto.email))
          return ResponseData.ok(null, '邮箱已存在');

        this.userService.updateUserInfos(dto);
        return ResponseData.ok(null, '邮箱绑定成功');
      } else return ResponseData.ok(null, '邮箱绑定失败：验证码错误或超时');
    } catch (error) {
      return ResponseData.fail('邮箱绑定失败：' + error);
    }
  }

  async updateEmail(dto: BindEmailDto) {
    try {
      if (!this.userService.findUserByUserId(dto.userId))
        return ResponseData.ok(null, '用户ID不存在');

      const currentCode = await this.cacheService.getCache(dto.email);

      if (dto.otp === currentCode) {
        this.cacheService.delCache(dto.email);
        if (!this.userService.findUserByEmail(dto.email))
          return ResponseData.ok(null, '用户未绑定邮箱');

        this.userService.updateUserInfos(dto);
        return ResponseData.ok(null, '邮箱绑定成功');
      } else return ResponseData.ok(null, '邮箱绑定失败：验证码错误或超时');
    } catch (error) {
      return ResponseData.fail('邮箱绑定失败：' + error);
    }
  }
}
