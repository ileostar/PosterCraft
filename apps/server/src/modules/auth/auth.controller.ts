import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { DefaultLoginDto, PhoneOtpLoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOAuth2, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CallbackUserDataDto } from './dto/oauth2.dto';
import { GoogleAuthGuard } from './providers/google/google.auth.guard';
import { CallbackUserData } from './decorator/callback.decorator';
import { GithubAuthGuard } from './providers/github/github.auth.guard';
import { EventGateway } from '../gateway/event.gateway';

@ApiTags('🤖用户鉴权模块')
@Controller('auth')
export class AuthController {
  configService: any;
  constructor(
    private readonly authService: AuthService,
    private readonly eventGateway: EventGateway,
  ) {}

  @Post('login')
  @ApiBody({ type: DefaultLoginDto })
  @ApiOperation({ summary: '默认登陆', description: '使用用户名/邮箱登陆' })
  async defaultLogin(@Body() dto: DefaultLoginDto) {
    try {
      return await this.authService.defaultLogin(dto);
    } catch (error) {
      return {
        msg: '登录失败：' + error,
      };
    }
  }

  @Post('phoneOtpLogin')
  @ApiBody({ type: PhoneOtpLoginDto })
  @ApiOperation({ summary: '短信登陆', description: '短信登陆' })
  async phoneOtpLogin(@Body() dto: PhoneOtpLoginDto) {
    try {
      const res = await this.authService.phoneOtpLogin(dto);
      return {
        code: 200,
        ...res,
      };
    } catch (error) {
      return {
        msg: '手机号登录失败' + error,
      };
    }
  }

  @Post('signup')
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: '注册', description: '注册' })
  async signup(@Body() dto: RegisterDto) {
    try {
      await this.authService.signup(dto);
      return {
        code: 200,
        msg: '注册成功',
      };
    } catch (error) {
      return {
        msg: '注册失败：' + error,
      };
    }
  }

  @ApiOAuth2([])
  @Get('google/callback')
  @ApiOperation({ summary: 'Google登录', description: 'Google登录' })
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@CallbackUserData() userData: CallbackUserDataDto) {
    try {
      const resData = await this.authService.oauthLogin(userData);
      this.eventGateway.sendMessageToAll(JSON.stringify(resData));
    } catch (error) {
      this.eventGateway.sendMessageToAll(
        JSON.stringify({
          code: -1,
          msg: error,
        }),
      );
    }
  }

  @ApiOAuth2([])
  @Get('github/callback')
  @ApiOperation({ summary: 'Github登录', description: 'Github登录' })
  @UseGuards(GithubAuthGuard)
  async githubCallback(@CallbackUserData() userData: CallbackUserDataDto) {
    try {
      const resData = await this.authService.oauthLogin(userData);
      this.eventGateway.sendMessageToAll(JSON.stringify(resData));
    } catch (error) {
      this.eventGateway.sendMessageToAll(
        JSON.stringify({
          code: -1,
          msg: error,
        }),
      );
    }
  }

  @Post('admin/login')
  @ApiBody({ type: DefaultLoginDto })
  @ApiOperation({ summary: '管理员登录', description: '管理员登录' })
  async adminLogin(@Body() dto: DefaultLoginDto) {
    try {
      return await this.authService.adminLogin(dto);
    } catch (error) {
      return {
        msg: '管理员登录失败' + error,
      };
    }
  }
}
