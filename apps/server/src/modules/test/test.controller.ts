import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DB, DbType } from 'src/modules/global/providers/db.provider';
import { user } from '@poster-craft/schema';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, DeleteUserDto } from '../user/dto/user.dto';
import { eq } from 'drizzle-orm';
import { number } from 'zod';
import { UpdateTestUserDto } from './dto/test.dto';

@ApiTags('🚧测试模块')
@Controller('test')
export class TestController {
  constructor(@Inject(DB) private db: DbType) {}

  // TODO 添加用户
  @Post('addUser')
  @ApiOperation({
    summary: '添加用户',
    description: '添加用户',
  })
  @ApiBody({ type: CreateUserDto })
  async addUser(@Body() dto: CreateUserDto) {
    try {
      await this.db.insert(user).values(dto);
      return {
        code: 200,
        msg: '执行成功',
      };
    } catch (error) {
      return {
        msg: '执行失败' + error,
      };
    }
  }

  // TODO 删除用户
  @Delete('delUser')
  @ApiQuery({ type: DeleteUserDto })
  @ApiOperation({
    summary: '删除用户',
    description: '删除用户',
  })
  async delUser(@Body() dto: DeleteUserDto) {
    try {
      const res = await this.db.delete(user).where(eq(user.id, dto.userId));
      return {
        code: 200,
        msg: '执行成功',
        data: res,
      };
    } catch (error) {
      return {
        msg: '执行失败' + error,
      };
    }
  }

  // TODO 修改用户
  @Put('updateUser')
  @ApiOperation({
    summary: '修改用户',
    description: '修改用户',
  })
  @ApiBody({ type: UpdateTestUserDto })
  async updateUser(@Body() dto: UpdateTestUserDto) {
    try {
      await this.db.update(user).set(dto).where(eq(user.id, dto.userId));
      return '执行成功';
    } catch (error) {
      return '执行失败' + error;
    }
  }

  // TODO 查找用户
  @Get('getUser')
  @ApiOperation({
    summary: '查找用户',
    description: '查找用户',
  })
  @ApiQuery({
    name: 'userId',
    description: '用户Id',
    type: number,
    required: true,
  })
  getUser(@Query() userId: string) {
    try {
      this.db.query.user.findFirst({
        where: eq(user.id, userId),
      });
      return '执行成功';
    } catch (error) {
      return '执行失败' + error;
    }
  }
}
