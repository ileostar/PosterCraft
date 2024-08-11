import { Injectable } from '@nestjs/common';
import * as OSS from 'ali-oss';
import { GlobalConfig } from 'src/config';

@Injectable()
export class OssService {
  private client: OSS;

  constructor() {
    this.client = new OSS({
      region: GlobalConfig.oss.region,
      accessKeyId: GlobalConfig.oss.accessKeyId,
      accessKeySecret: GlobalConfig.oss.accessKeySecret,
      bucket: GlobalConfig.oss.bucket,
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
}
