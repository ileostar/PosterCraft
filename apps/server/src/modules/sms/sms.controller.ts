import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import {
  SendCodeBySMSDto,
  UpdatePhoneDto,
  VerifyPhoneDto,
} from './dto/sms.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { APIResponse } from 'src/decorators/apiResponse.decorators';

@ApiTags('📞SMS短信模块')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('sendCode')
  @ApiBody({ type: SendCodeBySMSDto })
  @ApiOperation({
    summary: '发送手机验证码',
    description: '发送手机验证码并返回',
  })
  async sendCodeBySMS(@Body() dto: SendCodeBySMSDto) {
    try {
      await this.smsService.sendCodeBySMS(dto);
      return {
        code: 200,
        msg: '短信发送成功',
      };
    } catch (error) {
      return {
        msg: '短信发送失败：' + error,
      };
    }
  }

  @Post('verify')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '手机号验证',
    description: '用于邮箱更换或者手机号更换前的验证',
  })
  @ApiBody({ type: VerifyPhoneDto })
  async verifyPhone(
    @Body() dto: VerifyPhoneDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    try {
      await this.smsService.verifyPhone(userData.userId, dto);
      return {
        code: 200,
        msg: '手机号校验成功',
      };
    } catch (error) {
      return {
        msg: '手机号校验失败：' + error,
      };
    }
  }

  @Put()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdatePhoneDto })
  @ApiOperation({
    summary: '更换手机号',
    description: '更换前需要验证！！！',
  })
  @APIResponse()
  async updatePhone(
    @Body() dto: UpdatePhoneDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    try {
      await this.smsService.updatePhone(userData.userId, dto);
      return {
        code: 200,
        msg: '手机号更换成功',
      };
    } catch (error) {
      return {
        msg: '手机号更换失败：' + error,
      };
    }
  }
}
