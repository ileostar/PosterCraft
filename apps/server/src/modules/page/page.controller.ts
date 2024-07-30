import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PageService } from './page.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { string } from 'zod';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('🔮H5渲染模块')
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  // TODO 渲染H5页面
  @Get(':pageId')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'pageId',
    description: '渲染页面ID',
    required: true,
    type: string,
  })
  @ApiOperation({
    summary: '获取渲染H5',
    description: '获取渲染H5',
  })
  renderH5Page(@Param('pageId') pageId: string) {}
}
