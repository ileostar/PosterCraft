import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WorkService } from './work.service';

@ApiTags('工作区模块🔧')
@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Post('addWork')
  @ApiOperation({
    summary: '添加工作区',
    description: '添加工作区',
  })
  addWork() {}
}
