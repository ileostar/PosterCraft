import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OssService } from './oss.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt.guard';
import { UpdateUploadDto } from './dto/oss.dto';

@ApiTags('📦OSS对象存储模块')
@ApiBearerAuth()
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '上传文件' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: UpdateUploadDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    try {
      const key = `${Date.now()}-${file.originalname}`;
      const result = await this.ossService.uploadFile(file, key);
      return res.status(HttpStatus.OK).json({ url: result.url });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
