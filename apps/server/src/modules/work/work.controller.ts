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
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { WorkService } from './work.service';
import { string } from 'zod';

@ApiTags('🔧工作区模块')
@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  // TODO 添加工作区
  @Post()
  @ApiOperation({
    summary: '添加工作区',
    description: '添加工作区',
  })
  createWork() {}

  // TODO 复制工作区
  @Post('copy')
  @ApiOperation({
    summary: '复制工作区',
    description: '复制工作区',
  })
  copyWork() {}

  // TODO 获取工作区
  @Get()
  @ApiQuery({
    name: 'workId',
    required: false,
    description: '工作区Id（可选），不填默认获取所有工作区',
    type: string,
  })
  @ApiOperation({
    summary: '获取工作区信息',
    description: '获取工作区信息',
  })
  getWorksInfos() {}

  // TODO 更新工作区
  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: '工作区Id（必填）',
    type: string,
  })
  @ApiBody({})
  @ApiOperation({
    summary: '获取工作区信息',
    description: '获取工作区信息',
  })
  updateWorkInfos(@Param('id') id: string, @Body() dto) {}

  // TODO 删除工作区
  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: '工作区Id（必填）',
    type: string,
  })
  @ApiOperation({
    summary: '删除工作区',
    description: '根据工作区Id删除工作区',
  })
  deleteWorkInfos(@Param('id') id: string) {}
}
