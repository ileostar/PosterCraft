import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TemplateService } from './template.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { string } from 'zod';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiBearerAuth()
@ApiTags('🗿模板模块')
@Controller('templates')
export class TemplateController {
  constructor(private readonly TemplateService: TemplateService) {}

  // TODO 获取模板列表
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'id',
    required: true,
    description: '模板ID',
    type: string,
  })
  getTemplates(@Query() id: string) {}
}
