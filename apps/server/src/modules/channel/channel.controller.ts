import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
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
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { string } from 'zod';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import {
  ChannelsDto,
  CreateChannelDto,
  GetChannelsDto,
  UpdateChannelDto,
} from './dto/channel.dto';
import { APIResponse } from 'src/decorators/apiResponse.decorators';

@ApiTags('🧬通道模块')
@ApiBearerAuth()
@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post(':workId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区Id',
    type: string,
  })
  @ApiOperation({
    summary: '创建通道',
    description: '创建通道',
  })
  @APIResponse(ChannelsDto)
  async createChannel(
    @Param('workId') workId: string,
    @Body() dto: CreateChannelDto,
  ) {
    try {
      const data = await this.channelService.createChannel(workId, dto);
      return {
        code: 200,
        msg: '通道创建成功',
        data,
      };
    } catch (error) {
      return {
        msg: '创建通道失败：' + error,
      };
    }
  }

  @Get('getWorkChannels/:workId')
  @ApiParam({
    name: 'workId',
    required: true,
    description: '工作区ID',
    type: string,
  })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '获取通道',
    description: '根据工作区ID获取通道',
  })
  @APIResponse(GetChannelsDto)
  async getWorkChannels(@Param('workId') workId: string) {
    try {
      const res = await this.channelService.getChannel(workId);
      if (!res) throw '该工作区ID不存在';
      return {
        code: 200,
        msg: '获取通道成功',
        data: {
          count: res.channels.length,
          list: res.channels,
        },
      };
    } catch (error) {
      return '获取通道失败：' + error;
    }
  }

  @Put('updateName/:channelId')
  @ApiParam({
    name: 'channelId',
    required: true,
    description: '通道ID',
    type: string,
  })
  @ApiBody({ type: UpdateChannelDto })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '更新通道名称',
    description: '根据通道Id更新通道名称',
  })
  @APIResponse(Array<ChannelsDto>)
  async updateName(
    @Param('channelId') channelId: string,
    @Body() dto: UpdateChannelDto,
  ) {
    try {
      const data = await this.channelService.updateChannels(channelId, dto);
      return {
        code: 200,
        msg: '通道名称更新成功',
        data,
      };
    } catch (error) {
      return {
        msg: '更新通道名称失败：' + error,
      };
    }
  }

  @Delete(':channelId')
  @ApiParam({
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
  @APIResponse()
  async deleteChannel(@Param('channelId') channelId: string) {
    try {
      await this.channelService.deleteChannel(channelId);
      return {
        code: 200,
        msg: '删除通道成功',
      };
    } catch (error) {
      return {
        msg: '删除通道失败：' + error,
      };
    }
  }
}
