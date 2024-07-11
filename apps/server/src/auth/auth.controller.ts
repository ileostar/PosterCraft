import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { SignDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserEntity, User } from '../user/user.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('鉴权接口😀')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登陆', description: '登陆' })
  login(@Body() dto: SignDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  @ApiOperation({ summary: '注册', description: '注册' })
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @UseGuards(AuthGuard)
  @Get('userInfo')
  @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  userInfo(@User() user: UserEntity) {
    return user;
  }
}
