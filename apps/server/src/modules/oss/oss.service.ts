import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OssService {
  private client: OSS;

  constructor(private configService: ConfigService) {
    this.client = new OSS({
      region: this.configService.get<string>('OSS_REGION'),
      accessKeyId: this.configService.get<string>('OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get<string>('OSS_ACCESS_KEY_SECRET'),
      bucket: this.configService.get<string>('OSS_BUCKET'),
    });
  }

  async uploadFile(file: Express.Multer.File, key: string): Promise<any> {
    try {
      const result = await this.client.put(key, file.buffer);
      return result;
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  // 可以添加更多方法，如删除文件、获取文件URL等
}
