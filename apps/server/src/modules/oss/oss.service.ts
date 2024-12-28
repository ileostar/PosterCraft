import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { GlobalConfig } from 'src/config';
import { extname } from 'path';
import { nanoid } from 'nanoid';
import { UploadResponseDto } from './dto/oss.dto';

@Injectable()
export class OssService {
  private client: OSS;
  private readonly logger = new Logger(OssService.name);
  private readonly allowedExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.webp',
  ];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor() {
    this.client = new OSS({
      region: GlobalConfig.oss.region,
      accessKeyId: GlobalConfig.oss.accessKeyId,
      accessKeySecret: GlobalConfig.oss.accessKeySecret,
      bucket: GlobalConfig.oss.bucket,
      secure: true, // 使用 HTTPS
    });
  }

  /**
   * 上传文件到OSS
   * @param file 文件对象
   * @param directory 目录名称
   */
  async uploadFile(
    file: Express.Multer.File,
    directory?: string,
  ): Promise<UploadResponseDto> {
    try {
      // 文件验证
      await this.validateFile(file);

      // 生成文件名
      const ext = extname(file.originalname);
      const filename = `${nanoid()}${ext}`;

      // 构建存储路径
      const key = directory
        ? `${directory.replace(/^\/+|\/+$/g, '')}/${filename}`
        : filename;

      // 上传文件
      const result = await this.client.put(key, file.buffer, {
        headers: {
          'Content-Type': file.mimetype,
          'Cache-Control': 'max-age=31536000', // 缓存一年
        },
      });

      // 返回结果
      return {
        url: result.url,
        filename: filename,
        size: file.size,
      };
    } catch (error) {
      this.logger.error(`Upload failed: ${error.message}`, error.stack);
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }
  }

  /**
   * 验证文件
   */
  private async validateFile(file: Express.Multer.File): Promise<void> {
    // 检查文件大小
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File size exceeds ${this.maxFileSize / 1024 / 1024}MB limit`,
      );
    }

    // 检查文件类型
    const ext = extname(file.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(ext)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedExtensions.join(', ')}`,
      );
    }
  }

  /**
   * 删除文件
   */
  async deleteFile(key: string): Promise<void> {
    try {
      await this.client.delete(key);
    } catch (error) {
      this.logger.error(`Delete failed: ${error.message}`, error.stack);
      throw new BadRequestException(`Delete failed: ${error.message}`);
    }
  }
}
