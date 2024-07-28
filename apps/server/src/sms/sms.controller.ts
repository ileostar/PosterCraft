import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SmsService } from './sms.service';
import {
  SendCodeBySMSDto,
  UpdatePhoneDto,
  VerifyPhoneDto,
} from './dto/sms.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { string } from 'zod';

@ApiBearerAuth()
@ApiTags('SMS短信模块📞')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Get('sendCodeBySMS')
  @ApiQuery({
    name: 'phone',
    description: '用户手机号',
    type: string,
    required: true,
  })
  @ApiOperation({
    summary: '发送手机验证码',
    description: '发送手机验证码并返回',
  })
  sendCodeBySMS(@Body() dto: SendCodeBySMSDto) {
    return this.smsService.sendCodeBySMS(dto);
  }

  @Post('verifyPhone')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '手机号验证',
    description: '用于邮箱更换或者手机号更换前的验证',
  })
  @ApiBody({ type: VerifyPhoneDto })
  verifyPhone(
    @Body() dto: VerifyPhoneDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    return this.smsService.verifyPhone(userData.userId, dto);
  }

  @Put('verifyPhone')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdatePhoneDto })
  @ApiOperation({
    summary: '更换手机号',
    description: '更换前需要验证！！！',
  })
  updatePhone(
    @Body() dto: UpdatePhoneDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    return this.smsService.updatePhone(userData.userId, dto);
  }
}
