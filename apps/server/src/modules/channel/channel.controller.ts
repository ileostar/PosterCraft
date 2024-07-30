import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ChannelService } from './channel.service';
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
import { string } from 'zod';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiTags('🧬通道模块')
@ApiBearerAuth()
@Controller('channel')
export class ChannelController {
  constructor(private readonly ChannelService: ChannelService) {}

  // TODO 获取通道
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '获取通道',
    description: '获取通道',
  })
  getChannel() {}

  // TODO 获取工作区通道
  @Get('getWorkChannels/:channelId')
  @ApiQuery({
    name: 'channelId',
    required: true,
    description: '模板ID',
    type: string,
  })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '获取工作区通道',
    description: '根据通道Id获取工作区通道',
  })
  getWorkChannels(@Param('channelId') channelId: string) {}

  // TODO 更新通道名称
  @Put('updateName/:channelId')
  @ApiQuery({
    name: 'channelId',
    required: true,
    description: '模板ID',
    type: string,
  })
  @ApiBody({})
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '更新通道名称',
    description: '根据通道Id更新通道名称',
  })
  updateName(@Param('channelId') channelId: string, @Body() dto) {}

  // TODO 删除通道
  @Delete(':channelId')
  @ApiQuery({
    name: 'channelId',
    required: true,
    description: '通道ID',
    type: string,
  })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '删除通道',
    description: '根据通道Id删除通道',
  })
  deleteChannel(@Param('channelId') channelId: string) {}
}
