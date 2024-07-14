import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { SendCodeBySMSDto } from './dto/sms.dto';

@ApiTags('SMS短信接口📞')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('sendCodeBySMS')
  @ApiBody({ type: SendCodeBySMSDto })
  @ApiOperation({
    summary: '发送手机验证码',
    description: '发送手机验证码并返回',
  })
  sendCodeBySMS(@Body() dto: SendCodeBySMSDto) {
    return this.smsService.sendCodeBySMS(dto);
  }
}
