import { Controller, Post, Body, Get, UseGuards, Res } from '@nestjs/common';
import { DefaultLoginDto, PhoneOtpLoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserEntity, User } from '../user/user.decorators';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CallbackUserDataDto } from './dto/oauth2.dto';
import { GoogleAuthGuard } from './google/google.auth.guard';
import { CallbackUserData } from './decorator/callbackUserData.decorator';
import { GithubAuthGuard } from './github/github.auth.guard';
import { Response } from 'express';

@ApiTags('用户鉴权接口🤖')
@Controller('auth')
export class AuthController {
  configService: any;
  constructor(private readonly authService: AuthService) {}

  @Post('defaultLogin')
  @ApiBody({ type: DefaultLoginDto })
  @ApiOperation({ summary: '默认登陆', description: '使用用户名/邮箱登陆' })
  defaultLogin(@Body() dto: DefaultLoginDto) {
    return this.authService.defaultLogin(dto);
  }

  @Post('phoneOtpLogin')
  @ApiBody({ type: PhoneOtpLoginDto })
  @ApiOperation({ summary: '短信登陆', description: '短信登陆' })
  phoneOtpLogin(@Body() dto: PhoneOtpLoginDto) {
    return this.authService.phoneOtpLogin(dto);
  }

  @Post('signup')
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: '注册', description: '注册' })
  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @ApiExcludeEndpoint()
  @Get('google/callback')
  @ApiOperation({ summary: 'Google登录', description: 'Google登录' })
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@CallbackUserData() userData: CallbackUserDataDto) {
    return await this.authService.oauthLogin(userData);
  }

  @ApiExcludeEndpoint()
  @Get('github/callback')
  @ApiOperation({ summary: 'Github登录', description: 'Github登录' })
  @UseGuards(GithubAuthGuard)
  async githubCallback(
    @CallbackUserData() userData: CallbackUserDataDto,
    @Res() res: Response,
  ) {
    const resData = await this.authService.oauthLogin(userData);
    res.cookie('token', resData.token, {
      httpOnly: true,
    });

    // (window as any).opener.postMessage(resData, 'http://127.0.0.1:3000');
    // (window as any).close()
  }

  @UseGuards(AuthGuard)
  @Get('userInfo')
  @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  userInfo(@User() user: UserEntity) {
    return user;
  }
}
