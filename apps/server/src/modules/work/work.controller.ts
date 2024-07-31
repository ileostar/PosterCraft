import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { WorkService } from './work.service';
import { string } from 'zod';
import {
  CreateWorkDto,
  GetMyWorksListDto,
  ResponseWorkInfo,
  ResponseWorksListDto,
  UpdateWorkDto,
} from './dto/work.dto';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { APIResponse } from 'src/decorators/apiResponse.decorators';

@ApiTags('🔧工作区模块')
@ApiBearerAuth()
@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateWorkDto })
  @ApiOperation({
    summary: '创建工作区',
    description: '创建工作区',
  })
  async createWork(
    @Body() dto: CreateWorkDto,
    @CallbackUserData() userInfo: JwtPayloadDto,
  ) {
    const defaultVal = {
      isTemplate: false,
      isPublic: false,
      isHot: false,
      content: {},
    };
    return this.workService.createEmptyWork({
      ...defaultVal,
      ...dto,
      userId: userInfo.userId,
      author: userInfo.username,
    });
  }

  @Post('copy/:workId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区Id',
    type: string,
  })
  @ApiOperation({
    summary: '复制工作区',
    description: '复制工作区',
  })
  copyWork(
    @Param('workId') workId: string,
    @CallbackUserData() userInfo: JwtPayloadDto,
  ) {
    return this.workService.copyWork(workId, userInfo);
  }

  // TODO 获取工作区列表
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '获取工作区列表',
    description: '获取工作区列表',
  })
  @APIResponse(ResponseWorksListDto)
  async getWorksListInfos(
    @Query() query: GetMyWorksListDto,
    @CallbackUserData() userInfo: JwtPayloadDto,
  ) {
    try {
      const data = await this.workService.getWorksListInfos(userInfo.userId, {
        ...(query.title && { title: query.title }),
        pageIndex: query.pageIndex ?? 1,
        pageSize: query.pageSize ?? 10,
        ...(query.isTemplate && { isTemplate: Boolean(query.isTemplate) }),
      });
      return {
        code: 200,
        msg: '获取工作区列表成功',
        data,
      };
    } catch (error) {
      return {
        msg: '获取工作区列表失败' + error,
      };
    }
  }

  // TODO 获取单个工作区
  @Get(':workId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'workId',
    required: false,
    description: '工作区Id（可选），不填默认获取所有工作区',
    type: string,
  })
  @ApiOperation({
    summary: '获取单个工作区',
    description: '获取单个工作区',
  })
  @APIResponse(ResponseWorkInfo)
  async getWorkInfos(@Param('workId') workId: string) {
    try {
      const data = await this.workService.getWorkInfos(workId);
      return {
        code: 200,
        msg: '获取单个工作区成功',
        data: {
          ...data,
          id: void 0,
          uuid: void 0,
          createdAt: void 0,
          updatedAt: void 0,
          workId: data.uuid,
        },
      };
    } catch (error) {
      return {
        msg: '获取单个工作区失败' + error,
      };
    }
  }

  // TODO 更新工作区
  @Put(':workId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区Id（必填）',
    type: string,
  })
  @ApiBody({ type: UpdateWorkDto })
  @ApiOperation({
    summary: '更新工作区',
    description: '更新工作区',
  })
  @APIResponse(ResponseWorkInfo)
  updateWorkInfos(@Param('workId') workId: string, @Body() dto) {}

  // TODO 删除工作区
  @Delete(':workId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区Id（必填）',
    type: string,
  })
  @ApiOperation({
    summary: '删除工作区',
    description: '根据工作区Id删除工作区',
  })
  @APIResponse()
  async deleteWorkInfos(
    @Param('workId') workId: string,
    @CallbackUserData() userInfo: JwtPayloadDto,
  ) {
    try {
      const data = await this.workService.deleteWork(userInfo.userId, workId);
      if (!data[0].affectedRows) throw new Error('影响行数未变');
      return {
        code: 200,
        msg: '删除成功',
      };
    } catch (error) {
      return {
        msg: '删除失败' + error,
      };
    }
  }

  @Post('publish/:workId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区Id（必填）',
    type: string,
  })
  @ApiOperation({
    summary: '发布工作区',
    description: '根据工作区Id发布工作区',
  })
  publishWork(@Param('workId') workId: string) {}

  @Post('publish/template/:workId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区Id（必填）',
    type: string,
  })
  @ApiOperation({
    summary: '发布工作区模版',
    description: '根据工作区Id发布工作区模版',
  })
  publishWorkTemplate(@Param('workId') workId: string) {}
}
