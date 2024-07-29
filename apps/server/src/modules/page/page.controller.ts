import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageService } from './page.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { string } from 'zod';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('🔮H5渲染模块')
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  // TODO 渲染H5页面
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'workId',
    description: '渲染页面ID',
    required: true,
    type: string,
  })
  renderH5Page(@Query() workId: string) {}
}
