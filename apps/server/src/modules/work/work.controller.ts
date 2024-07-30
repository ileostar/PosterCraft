import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { WorkService } from './work.service';
import { string } from 'zod';

@ApiTags('🔧工作区模块')
@ApiBearerAuth()
@Controller('works')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  // TODO 添加工作区
  @Post()
  @ApiOperation({
    summary: '创建工作区',
    description: '创建工作区',
  })
  createWork() {}

  // TODO 复制工作区
  @Post('copy/:workId')
  @ApiParam({
    name: 'workId',
    required: false,
    description: '工作区Id（可选），不填默认获取所有工作区',
    type: string,
  })
  @ApiOperation({
    summary: '复制工作区',
    description: '复制工作区',
  })
  copyWork(@Param('workId') workId: string) {}

  // TODO 获取工作区列表
  @Get()
  @ApiOperation({
    summary: '获取工作区列表',
    description: '获取工作区列表',
  })
  getWorksInfos() {}

  // TODO 获取单个工作区
  @Get(':workId')
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
  getWorkInfos(@Param('workId') workId: string) {}

  // TODO 更新工作区
  @Put(':workId')
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区Id（必填）',
    type: string,
  })
  @ApiBody({})
  @ApiOperation({
    summary: '更新工作区',
    description: '更新工作区',
  })
  updateWorkInfos(@Param('workId') workId: string, @Body() dto) {}

  // TODO 删除工作区
  @Delete(':workId')
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
  deleteWorkInfos(@Param('workId') workId: string) {}

  @Post('publish/:workId')
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
