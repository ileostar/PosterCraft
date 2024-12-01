import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TemplateService } from './template.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { string } from 'zod';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { GetTemplateListDto } from './dto/template.dto';

@ApiBearerAuth()
@ApiTags('🗿模板模块')
@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async getTemplates(@Query() query: GetTemplateListDto) {
    try {
      const data = await this.templateService.getTemplatesList(query);
      return {
        code: 200,
        msg: '获取工作区列表成功',
        data,
      };
    } catch (error) {
      return {
        msg: '获取模版列表失败' + error,
      };
    }
  }

  @Get(':workId')
  @ApiParam({
    name: 'workId',
    required: true,
    description: '模板工作区ID',
    type: string,
  })
  async getTemplateInfo(@Param('workId') workId: string) {
    try {
      const data = await this.templateService.getTemplateInfo(workId);
      return {
        code: 200,
        data,
      };
    } catch (error) {
      return {
        msg: '获取模板信息失败' + error,
      };
    }
  }
}
