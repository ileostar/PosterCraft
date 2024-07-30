import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  PickType,
} from '@nestjs/swagger';
import { SmsService } from './sms.service';
import {
  SendCodeBySMSDto,
  UpdatePhoneDto,
  VerifyPhoneDto,
} from './dto/sms.dto';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { string } from 'zod';
import { PhoneOtpLoginDto } from '../auth/dto/auth.dto';

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
  sendCodeBySMS(@Body() dto: SendCodeBySMSDto) {
    return this.smsService.sendCodeBySMS(dto);
  }

  @Post('verify')
  @ApiBearerAuth()
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

  @Put()
  @ApiBearerAuth()
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
