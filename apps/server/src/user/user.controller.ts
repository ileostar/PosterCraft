import { Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { DB, DbType } from 'src/global/providers/db.provider';
import { user } from '@poster-craft/schema';
import { ResponseData } from '../response/responseFormat';

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
