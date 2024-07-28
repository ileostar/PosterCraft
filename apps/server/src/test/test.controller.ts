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
import { DB, DbType } from '../global/providers/db.provider';
import { user } from '@poster-craft/schema';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { eq } from 'drizzle-orm';
import { number } from 'zod';
import { UpdateTestUserDto } from './dto/test.dto';

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
  async addUser(dto: CreateUserDto) {
    try {
      await this.db.insert(user).values(dto);
      return '执行成功';
    } catch (error) {
      return '执行失败' + error;
    }
  }

  // TODO 删除用户
  @Delete('delUser')
  @ApiQuery({
    name: 'userId',
    description: '用户Id',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '删除用户',
    description: '删除用户',
  })
  async delUser(@Query() userId: number) {
    try {
      await this.db.delete(user).where(eq(user.id, userId));
      return '执行成功';
    } catch (error) {
      return '执行失败' + error;
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
  getUser(@Query() userId: number) {
    try {
      this.db.query.user.findFirst({
        where: eq(user.id, userId),
      });
      return '执行成功';
    } catch (error) {
      return '执行失败' + error;
    }
  }

  // TODO 添加工作区
  @Post('addWork')
  addWork() {}

  // TODO 删除工作区
  @Delete('delWork')
  delWork() {}

  // TODO 修改工作区
  @Put('updateWork')
  updateWork() {}

  // TODO 查找工作区
  @Get('getWork')
  getWork() {}
}
