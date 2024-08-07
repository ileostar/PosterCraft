import { Body, Controller, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import {
  BindEmailDto,
  SendCodeByEmailDto,
  VerifyEmailDto,
} from './dto/mail.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { APIResponse } from 'src/decorators/apiResponse.decorators';

@ApiTags('📧邮箱模块')
@Controller('/mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('sendCode')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: SendCodeByEmailDto })
  @ApiOperation({
    summary: '发送邮箱验证码',
    description: '发送邮箱验证码并返回',
  })
  @APIResponse()
  async sendCodeByEmail(@Query() dto: SendCodeByEmailDto) {
    try {
      await this.mailService.sendCodeByMail(dto);
      return {
        code: 200,
        msg: '邮箱发送成功',
      };
    } catch (error) {
      return {
        msg: '邮箱发送失败：' + error,
      };
    }
  }

  @Post('bind')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: BindEmailDto })
  @ApiBearerAuth()
  @ApiOperation({
    summary: '绑定邮箱',
    description: '输入邮箱和验证码绑定邮箱',
  })
  @APIResponse()
  async bindOrUpdateMail(
    @Body() dto: BindEmailDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    try {
      await this.mailService.bindMail(userData.userId, dto);
      return {
        code: 200,
        msg: '邮箱绑定成功',
      };
    } catch (error) {
      return {
        msg: '邮箱绑定失败：' + error,
      };
    }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: BindEmailDto })
  @ApiOperation({
    summary: '更换邮箱',
    description: '更换邮箱(更新前请先进行邮箱校验)',
  })
  async updateEmail(
    @Body() dto: BindEmailDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    try {
      await this.mailService.updateEmail(userData.userId, dto);
      return {
        code: 200,
        msg: '邮箱更新成功',
      };
    } catch (error) {
      return {
        msg: '邮箱更新失败：' + error,
      };
    }
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '邮箱验证',
    description: '用于邮箱更换或者手机号更换前的验证',
  })
  @ApiBody({ type: VerifyEmailDto })
  @APIResponse()
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    try {
      await this.mailService.verifyEmail(dto);
      return {
        code: 200,
        msg: '邮箱验证成功',
      };
    } catch (error) {
      return '邮箱验证失败：' + error;
    }
  }
}
