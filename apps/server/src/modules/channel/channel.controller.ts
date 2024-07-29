import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ChannelService } from './channel.service';
import { Controller, Delete, Get, Put, Query, UseGuards } from '@nestjs/common';
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
  getChannel() {}

  // TODO 获取工作区通道
  @Get('getWorkChannels')
  @ApiQuery({
    name: 'id',
    required: true,
    description: '模板ID',
    type: string,
  })
  @UseGuards(JwtAuthGuard)
  getWorkChannels(@Query() id: string) {}

  // TODO 获取工作区通道
  @Put('updateName')
  @ApiQuery({
    name: 'id',
    required: true,
    description: '模板ID',
    type: string,
  })
  @UseGuards(JwtAuthGuard)
  updateName(@Query() id: string) {}

  // TODO 获取工作区通道
  @Delete()
  @ApiQuery({
    name: 'id',
    required: true,
    description: '模板ID',
    type: string,
  })
  @UseGuards(JwtAuthGuard)
  deleteChannel(@Query() id: string) {}
}
