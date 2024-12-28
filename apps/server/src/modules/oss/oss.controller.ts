import {
  Controller,
  Post,
  Delete,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Query,
  Body,
} from '@nestjs/common';
import { OssService } from './oss.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UploadFileDto, UploadResponseDto } from './dto/oss.dto';
import { FileInterceptor } from '@nest-lab/fastify-multer';

@ApiTags('📦 OSS模块')
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
    description: '上传文件',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 200,
    description: '上传成功',
    type: UploadResponseDto,
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('directory') directory?: string,
  ) {
    const result = await this.ossService.uploadFile(file, directory);
    return {
      code: 200,
      msg: '上传成功',
      data: result,
    };
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '删除文件' })
  async deleteFile(@Query('key') key: string) {
    await this.ossService.deleteFile(key);
    return {
      code: 200,
      msg: '删除成功',
    };
  }
}
