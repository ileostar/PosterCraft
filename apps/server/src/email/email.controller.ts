import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { SendCodeByEmailDto } from './dto/email.dto';

@ApiTags('邮箱接口📧')
@Controller('/email')
export class EmailController {
  constructor(private emailService: EmailService) {}
  // @Get('sendCodeByEmail')
  // @ApiOperation({ summary: '发送邮箱验证码', description: '发送邮箱验证码并返回' })
  // sendCodeByEmail(@Body() dto: PhoneOtpLoginDto) {
  //   return this.authService.phoneOtpLogin(dto);
  // }

  /**
   * Description placeholder
   * // TODO 绑定邮箱
   * @type {*}
   */
  bindEmail() {}

  /**
   * Description placeholder
   * // TODO 发送/验证邮箱
   * @type {*}
   */
  @ApiBody({ type: SendCodeByEmailDto })
  @Post('sendCodeByEmail')
  sendCodeByEmail(@Body() dto: SendCodeByEmailDto) {}

  /**
   * Description placeholder
   * // TODO 更新邮箱
   */
  updateEmail() {}
}
