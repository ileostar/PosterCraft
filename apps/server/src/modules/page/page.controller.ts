import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PageService } from './page.service';
import { Controller, Get, Param, Render, Res } from '@nestjs/common';
import { string } from 'zod';

@ApiBearerAuth()
@ApiTags('🔮H5渲染模块')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  splitIdAndUuid(str = '') {
    const result = { id: '', uuid: '' };
    if (!str) return result;
    const firstDashIndex = str.indexOf('-');
    if (firstDashIndex < 0) return result;
    result.id = str.slice(0, firstDashIndex);
    result.uuid = str.slice(firstDashIndex + 1);
    return result;
  }

  @Get(':pageId')
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
  @Render('index')
  async renderH5Page(@Param('pageId') pageId: string, @Res() res) {
    try {
      const query = this.splitIdAndUuid(pageId);
      console.log('=============', query);
      const data = await this.pageService.renderToPageData(query);
      res.view('index.art', data);
      return {
        code: 200,
        data: '页面渲染成功',
      };
    } catch (error) {
      return {
        msg: '获取H5页面失败：' + error,
      };
    }
  }

  @Get('preview/:pageId')
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
  @Render('index')
  async renderH5PagePreview(@Param('pageId') pageId: string, @Res() res) {
    try {
      const query = this.splitIdAndUuid(pageId);
      const data = await this.pageService.renderToPageData(query, true);
      res.view('index.art', data);
      return {
        code: 200,
        data: '页面渲染成功',
      };
    } catch (error) {
      return {
        msg: '获取H5页面失败：' + error,
      };
    }
  }
}
