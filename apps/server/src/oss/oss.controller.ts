import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OssService } from './oss.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OSS存储🛢')
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res) {
    try {
      const key = `${Date.now()}-${file.originalname}`; // 自定义文件key
      const result = await this.ossService.uploadFile(file, key);
      // 假设返回文件的URL
      return res.status(HttpStatus.OK).json({ url: result.url });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
