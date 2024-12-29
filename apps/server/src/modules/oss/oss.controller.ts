import {
  Controller,
  Post,
  UploadedFile,
  HttpStatus,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OssService } from './oss.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UpdateUploadDto, UpdateUploadResponseDto } from './dto/oss.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { APIResponse } from 'src/decorators/apiResponse.decorators';
import { url } from 'inspector';

@ApiTags('📦OSS对象存储模块')
@ApiBearerAuth()
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '上传文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: UpdateUploadDto,
  })
  @APIResponse(UpdateUploadResponseDto)
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const key = `${Date.now()}-${file.originalname}`;
      console.log('111', file);
      const result = await this.ossService.uploadFile(file, key);
      return {
        code: 200,
        data: { url: result.url },
      };
    } catch (error) {
      return {
        msg: '上传出错：' + error,
      };
    }
  }
}
