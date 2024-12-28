import { Module } from '@nestjs/common';
import { OssController } from './oss.controller';
import { OssService } from './oss.service';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';

@Module({
  imports: [
    FastifyMulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  ],
  controllers: [OssController],
  providers: [OssService],
  exports: [OssService],
})
export class OssModule {}
