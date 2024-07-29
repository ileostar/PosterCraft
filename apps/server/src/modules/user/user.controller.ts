import {
  Body,
  Controller,
  Delete,
  Get,
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
  OmitType,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  DeleteUserDto,
  FindUserDto,
  UpdateUserDto,
} from './dto/user.dto';
import { number } from 'zod';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { APIResponse } from 'src/decorators/apiResponse.decorators';
import { DbType } from 'src/modules/global/providers/db.provider';
import { schemas } from '@poster-craft/schema';

@ApiBearerAuth()
@ApiTags('😀用户信息模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @APIResponse(OmitType(CreateUserDto, ['password']))
  async getUserInfosByUserId(@Query() query: { userId: string }) {
    const user = await this.userService.findUserByUserId(query.userId);
    if (!user) {
      return {
        msg: '用户查询失败',
      };
    } else {
      return {
        data: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          nickname: user.nickname,
          role: user.role,
        },
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateUserInfos')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: '更新用户信息', description: '测试' })
  @APIResponse()
  async updateUserInfos(@Body() dto: UpdateUserDto) {
    return this.userService.updateUserInfos(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('deleteUserById')
  @ApiBody({ type: DeleteUserDto })
  @ApiOperation({ summary: '注销当前用户', description: '根据用户ID删除用户' })
  @APIResponse()
  async deleteUserById(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUser(dto);
  }
}
