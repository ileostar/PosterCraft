import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import {
  AddPasswordDto,
  ChangePasswordDto,
  CreateUserDto,
  QueryUserDto,
  UpdateUserDto,
} from './dto/user.dto';
import { number } from 'zod';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { APIResponse } from 'src/decorators/apiResponse.decorators';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';

@ApiBearerAuth()
@ApiTags('😀用户信息模块')
@Controller('user')
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
    summary: '获取当前用户信息',
    description: '根据用户ID获取用户信息',
  })
  @APIResponse(OmitType(CreateUserDto, ['password']))
  async getUserInfosByUserId(@Param('userId') userId: string) {
    try {
      const user = await this.userService.findUserByUserId(userId);
      if (!user) throw '用户Id不存在';
      return {
        code: 200,
        data: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          nickname: user.nickname,
          role: user.role,
        },
      };
    } catch (error) {
      return {
        msg: '用户查询失败:' + error,
      };
    }
  }

  @Get('all')
  @ApiOperation({
    summary: '获取所有用户信息',
    description: '获取所有用户信息，支持分页和搜索',
  })
  @ApiQuery({ type: QueryUserDto, required: false })
  @UseGuards(JwtAuthGuard)
  @APIResponse([OmitType(CreateUserDto, ['password'])])
  async getUserInfos(
    @CallbackUserData() userInfos: JwtPayloadDto,
    @Query() query: QueryUserDto,
  ) {
    try {
      if (userInfos.role !== 'admin') throw '无权限';
      const result = await this.userService.findAllUsers(query);
      return {
        code: 200,
        data: result.users,
        total: result.total,
      };
    } catch (error) {
      return {
        msg: '用户查询失败:' + error,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  @ApiParam({
    name: 'userId',
    description: '用户ID',
    type: number,
    required: true,
  })
  @ApiBody({ type: OmitType(UpdateUserDto, ['userId']) })
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据userId更新用户信息',
  })
  @APIResponse(OmitType(UpdateUserDto, ['userId']))
  async updateUserInfos(
    @Param('userId') userId: string,
    @Body() dto: Omit<UpdateUserDto, 'userId'>,
  ) {
    try {
      const data = await this.userService.updateUserInfos({
        userId,
        ...dto,
      });
      return {
        code: 200,
        msg: '更新用户信息成功！',
        data,
      };
    } catch (error) {
      return {
        msg: '更新用户信息失败：' + error,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('password')
  @ApiOperation({
    summary: '检测用户密码状态',
    description: '检测当前用户使用已设置密码',
  })
  @APIResponse()
  async checkUserPasswordStatus(@CallbackUserData() userData: JwtPayloadDto) {
    try {
      const user = await this.userService.findUserByUserId(userData.userId);
      if (!user) throw '用户Id不存在';
      return {
        code: 200,
        data: {
          hasPassword: user.password ? true : false,
        },
      };
    } catch (error) {
      return {
        msg: '密码查询失败:' + error,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('password')
  @ApiBody({ type: AddPasswordDto })
  @ApiOperation({ summary: '添加密码', description: '添加密码' })
  @APIResponse()
  async addPassword(
    @Body() dto: AddPasswordDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    try {
      await this.userService.addPassword(userData.userId, dto);
      return {
        code: 200,
        msg: '密码添加成功！',
      };
    } catch (error) {
      return {
        msg: '密码添加失败：' + error,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('password')
  @ApiBody({ type: ChangePasswordDto })
  @APIResponse()
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @CallbackUserData() userData: JwtPayloadDto,
  ) {
    try {
      await this.userService.changePassword(userData.userId, dto);
      return {
        code: 200,
        msg: '密码修改成功！',
      };
    } catch (error) {
      return {
        msg: '密码修改失败：' + error,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: '创建用户',
    description: '创建新用户',
  })
  @APIResponse(OmitType(CreateUserDto, ['password']))
  async createUser(
    @Body() dto: CreateUserDto,
    @CallbackUserData() userInfos: JwtPayloadDto,
  ) {
    try {
      if (userInfos.role !== 'admin') throw '无权限';
      const user = await this.userService.createUser(dto);
      return {
        code: 200,
        msg: '创建用户成功！',
        data: user,
      };
    } catch (error) {
      return {
        msg: '创建用户失败:' + error,
      };
    }
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
    try {
      await this.userService.deleteUser(userId);
      return {
        code: 200,
        msg: '删除成功',
      };
    } catch (error) {
      return {
        msg: '删除失败：' + error,
      };
    }
  }
}
