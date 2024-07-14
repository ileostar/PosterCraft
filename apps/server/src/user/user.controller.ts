import {
  Body,
  Controller,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { DefaultLoginDto } from 'src/auth/dto/auth.dto';
import { CreateUserDto } from './dto/user.dto';
import { DB, DbType } from 'src/global/providers/db.provider';
import { user } from '@poster-craft/schema';
import { ResponseData } from 'src/response/ResponseFormat';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(DB) private db: DbType,
  ) {}

  @Post('test')
  @ApiOperation({ summary: '测试', description: '测试' })
  async testAdd() {
    const [res] = await this.db.insert(user).values({
      phone: '14709723891',
      username: 'demo',
    });
    return ResponseData.ok(res);
  }
}
