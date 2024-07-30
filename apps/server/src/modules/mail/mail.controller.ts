import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MailService } from './mail.service';
import {
  BindEmailDto,
  SendCodeByEmailDto,
  VerifyEmailDto,
} from './dto/mail.dto';
import { string } from 'zod';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';

@ApiTags('📧邮箱模块')
@Controller('/mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('bind')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: BindEmailDto })
  @ApiBearerAuth()
  @ApiOperation({
    summary: '绑定邮箱',
    description: '输入邮箱和验证码绑定邮箱',
  })
  bindOrUpdateMail(
    @Body() dto: BindEmailDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    return this.mailService.bindMail(userData.userId, dto);
  }

  @Post('sendCode')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: SendCodeByEmailDto })
  @ApiOperation({
    summary: '发送邮箱验证码',
    description: '发送邮箱验证码并返回',
  })
  sendCodeByEmail(@Query() dto: SendCodeByEmailDto) {
    return this.mailService.sendCodeByMail(dto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: BindEmailDto })
  @ApiOperation({
    summary: '更换邮箱',
    description: '更换邮箱(更新前请先进行邮箱校验)',
  })
  updateEmail(
    @Body() dto: BindEmailDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    return this.mailService.updateEmail(userData.userId, dto);
  }

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '邮箱验证',
    description: '用于邮箱更换或者手机号更换前的验证',
  })
  @ApiBody({ type: VerifyEmailDto })
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.mailService.verifyEmail(dto);
  }
}
