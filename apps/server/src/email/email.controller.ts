import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from './email.service';

/**
 * Description placeholder
 *
 * @export
 * @class EmailController
 * @typedef {EmailController}
 */
/**
 * Description placeholder
 *
 * @export
 * @class EmailController
 * @typedef {EmailController}
 */
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

  /**
   * Description placeholder
   * // TODO 发送/验证邮箱
   * @type {*}
   */

  /**
   * Description placeholder
   * // TODO 更新邮箱
   */
}
