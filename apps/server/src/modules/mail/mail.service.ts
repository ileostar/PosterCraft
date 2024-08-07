import { Injectable } from '@nestjs/common';
import {
  SendCodeByEmailDto,
  BindEmailDto,
  VerifyEmailDto,
} from './dto/mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { generateVerificationCode } from 'src/common/utils';
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
    const code = generateVerificationCode();
    await this.cacheService.setCache(dto.email, code);
    await this.sendMail(dto.email, code);
  }

  async bindMail(id: string, dto: BindEmailDto) {
    if (!(await this.userService.findUserByUserId(id))) throw '用户ID不存在';
    if (dto.otp !== (await this.cacheService.getCache(dto.email)))
      throw '邮箱绑定失败：验证码错误';
    if (await this.userService.findUserByEmail(dto.email)) throw '邮箱已存在';
    await this.userService.updateUserInfos({
      ...dto,
      userId: id,
    });
    await this.cacheService.delCache(dto.email);
  }

  async updateEmail(id: string, dto: BindEmailDto) {
    if (await this.userService.checkEmailExists(dto.email))
      throw '邮箱已被绑定';
    if (dto.otp === (await this.cacheService.getCache(dto.email)))
      throw '邮箱绑定失败：验证码错误';
    if (!(await this.userService.findUserByEmail(dto.email)))
      throw '用户未绑定邮箱';
    await this.userService.updateUserInfos({
      ...dto,
      userId: id,
    });
    await this.cacheService.delCache(dto.email);
  }

  async verifyEmail(dto: VerifyEmailDto) {
    if (await this.userService.checkEmailExists(dto.email))
      throw '用户邮箱不存在';
    if (dto.otp === (await this.cacheService.getCache(dto.email)))
      throw '邮箱绑定失败：验证码错误';
    await this.cacheService.delCache(dto.email);
  }
}
