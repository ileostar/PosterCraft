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
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CallbackUserData } from 'src/auth/decorator/callback.decorator';
import { JwtPayloadDto } from 'src/auth/dto/jwt.dto';

@ApiBearerAuth()
@ApiTags('邮箱模块📧')
@Controller('/mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('bindEmail')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: BindEmailDto })
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

  @Get('sendCodeByEmail')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'email',
    description: '用户邮箱',
    type: string,
    required: true,
  })
  @ApiOperation({
    summary: '发送邮箱验证码',
    description: '发送邮箱验证码并返回',
  })
  sendCodeByEmail(@Query() dto: SendCodeByEmailDto) {
    return this.mailService.sendCodeByMail(dto);
  }

  @Put('updateEmail')
  @UseGuards(JwtAuthGuard)
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

  @Post('verifyEmail')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '邮箱验证',
    description: '用于邮箱更换或者手机号更换前的验证',
  })
  @ApiBody({ type: VerifyEmailDto })
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.mailService.verifyEmail(dto);
  }
}
