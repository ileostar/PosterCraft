import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteUserDto, UpdateUserDto } from './dto/user.dto';
import { number } from 'zod';
import { ResponseData } from '../response/responseFormat';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { user } from '@poster-craft/schema';
import { DB, DbType } from 'src/global/providers/db.provider';
import { eq } from 'drizzle-orm';

@ApiBearerAuth()
@ApiTags('用户信息模块😀')
@Controller('user')
export class UserController {
  constructor(
    @Inject(DB) private db: DbType,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('getUserInfosByUserId')
  @ApiQuery({
    name: 'userId',
    description: '用户ID',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '获取用户信息',
    description: '根据用户ID获取用户信息',
  })
  async getUserInfosByUserId(@Query() query: { userId: string }) {
    const user = await this.userService.findUserByUserId(Number(query.userId));
    if (!user) {
      return ResponseData.fail('用户查询失败');
    } else {
      return ResponseData.ok(user, '获取用户信息成功');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateUserInfos')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: '更新用户信息', description: '测试' })
  async updateUserInfos(@Body() dto: UpdateUserDto) {
    return this.userService.updateUserInfos(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteUserById')
  @ApiBody({ type: DeleteUserDto })
  @ApiOperation({ summary: '注销当前用户', description: '根据用户ID删除用户' })
  async deleteUserById(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUser(dto);
  }
}
