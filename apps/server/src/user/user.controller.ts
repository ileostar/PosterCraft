import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { DeleteUserDto, UpdateUserDto } from './dto/user.dto';
import { number } from 'zod';
import { ResponseData } from '../response/responseFormat';
import { AuthGuard } from '../guards/auth.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
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
  async getUserInfosByUserId(@Query() userId: number) {
    const user = await this.userService.findUserByUserId(userId);
    if (!user) {
      return ResponseData.fail('用户查询失败');
    } else {
      return ResponseData.ok(user, '获取用户信息成功');
    }
  }

  @UseGuards(AuthGuard)
  @Post('updateUserInfos')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: '更新用户信息', description: '测试' })
  async updateUserInfos(@Body() dto: UpdateUserDto) {
    return this.userService.updateUserInfos(dto);
  }

  @UseGuards(AuthGuard)
  @Delete('deleteUserById')
  @ApiBody({ type: DeleteUserDto })
  @ApiOperation({ summary: '注销当前用户', description: '根据用户ID删除用户' })
  async deleteUserById(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUser(dto);
  }
}
