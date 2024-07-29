import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GlobalModule } from '../global/global.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { SmsModule } from '../sms/sms.module';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from '../gateway/gateway.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { OssModule } from '../oss/oss.module';
import { TestModule } from '../test/test.module';
import { WorkModule } from '../work/work.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
    AuthModule,
    UserModule,
    SmsModule,
    GatewayModule,
    MailModule,
    OssModule,
    WorkModule,
    TestModule,
    PassportModule.register({ secret: process.env.JWT_SERECT }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: process.env.REDIS_URL,
        options: {
          password: process.env.REDIS_PASSWORD,
        },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
