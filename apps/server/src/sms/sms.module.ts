import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { CacheModule } from '../cache/cache.modules';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, CacheModule],
  controllers: [SmsController],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
