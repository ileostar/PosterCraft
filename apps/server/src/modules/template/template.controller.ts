import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TemplateService } from './template.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { string } from 'zod';
import { GetTemplateListDto } from './dto/template.dto';
import { APIResponse } from 'src/decorators/apiResponse.decorators';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CallbackUserData } from '../auth/decorator/callback.decorator';
import { JwtPayloadDto } from '../auth/dto/jwt.dto';
import { ResponseWorksListDto, GetMyWorksListDto } from '../work/dto/work.dto';

@ApiBearerAuth()
@ApiTags('🗿模板模块')
@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('list')
  @ApiOperation({
    summary: '获取工作区列表',
    description: '获取工作区列表',
  })
  @APIResponse(ResponseWorksListDto)
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

  @Get('user/list')
  @ApiOperation({
    summary: '获取用户工作区列表',
    description: '获取用户工作区列表',
  })
  @APIResponse(ResponseWorksListDto)
  @UseGuards(JwtAuthGuard)
  async getUserTemplates(
    @Query() query: GetTemplateListDto,
    @CallbackUserData() userInfo: JwtPayloadDto,
  ) {
    try {
      const data = await this.templateService.getUserTemplatesList(
        userInfo.userId,
        query,
      );
      return {
        code: 200,
        msg: '获取用户工作区列表成功',
        data,
      };
    } catch (error) {
      return {
        msg: '获取用户工作区列表失败' + error,
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

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '获取用户工作区模版列表',
    description: '获取用户工作区模版列表',
  })
  @APIResponse(ResponseWorksListDto)
  async getUserTemplatesList(
    @Query() query: GetMyWorksListDto,
    @CallbackUserData() userInfo: JwtPayloadDto,
  ) {
    try {
      return {
        code: 200,
        msg: '获取用户工作区模版列表成功',
      };
    } catch (error) {
      return {
        msg: '获取用户工作区模版列表失败' + error,
      };
    }
  }
}
