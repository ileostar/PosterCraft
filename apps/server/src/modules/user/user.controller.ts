import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { number } from 'zod';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { APIResponse } from 'src/decorators/apiResponse.decorators';

@ApiBearerAuth()
@ApiTags('😀用户信息模块')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    type: number,
    required: true,
  })
  @ApiOperation({
    summary: '获取用户信息',
    description: '根据用户ID获取用户信息',
  })
  @APIResponse(OmitType(CreateUserDto, ['password']))
  async getUserInfosByUserId(@Param('userId') userId: string) {
    try {
      const user = await this.userService.findUserByUserId(userId);
      return user
        ? {
            code: 200,
            data: {
              username: user.username,
              email: user.email,
              phone: user.phone,
              avatar: user.avatar,
              nickname: user.nickname,
              role: user.role,
            },
          }
        : {
            code: 200,
            msg: '用户Id不存在',
          };
    } catch (error) {
      return {
        code: -1,
        msg: '用户查询失败:' + error,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    type: number,
    required: true,
  })
  @ApiBody({ type: OmitType(UpdateUserDto, ['userId']) })
  @ApiOperation({ summary: '更新用户信息', description: '测试' })
  @APIResponse()
  async updateUserInfos(
    @Param('userId') userId: string,
    @Body() dto: Omit<UpdateUserDto, 'userId'>,
  ) {
    return this.userService.updateUserInfos({
      userId,
      ...dto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    type: number,
    required: true,
  })
  @ApiOperation({ summary: '注销当前用户', description: '根据用户ID删除用户' })
  @APIResponse()
  async deleteUserById(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
