import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DB, DbType } from 'src/modules/global/providers/db.provider';
import * as argon2 from 'argon2';
import { user } from '@poster-craft/schema';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/user.dto';
import { number } from 'zod';
import { UpdateTestUserDto } from './dto/test.dto';
import { eq } from 'drizzle-orm';

@ApiTags('🚧测试模块')
@Controller('test')
export class TestController {
  constructor(@Inject(DB) private db: DbType) {}

  @Post()
  @ApiOperation({
    summary: '添加用户',
    description: '添加用户',
  })
  @ApiBody({ type: CreateUserDto })
  async addUser(@Body() dto: CreateUserDto) {
    try {
      await this.db.insert(user).values({
        ...dto,
        password: await argon2.hash(dto.password),
      });
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

  @Delete(':userId')
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '删除用户',
    description: '删除用户',
  })
  async delUser(@Param('userId') userId: string) {
    try {
      const res = await this.db.delete(user).where(eq(user.id, userId));
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

  @Put(':userId')
  @ApiOperation({
    summary: '修改用户',
    description: '修改用户',
  })
  @ApiBody({ type: OmitType(UpdateTestUserDto, ['userId']) })
  async updateUser(
    @Param('userId') userId: string,
    @Body() dto: Omit<UpdateTestUserDto, 'userId'>,
  ) {
    try {
      await this.db.update(user).set(dto).where(eq(user.id, userId));
      return '执行成功';
    } catch (error) {
      return '执行失败' + error;
    }
  }

  @Get(':userId')
  @ApiParam({
    name: 'userId',
    description: '用户Id',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '查找用户',
    description: '查找用户',
  })
  getUser(@Param('userId') userId: string) {
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
