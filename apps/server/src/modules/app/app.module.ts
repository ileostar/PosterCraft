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
import { ChannelModule } from '../channel/channel.module';
import { PageModule } from '../pages/page.module';
import { TemplateModule } from '../template/template.module';
import { GlobalConfig } from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalModule,
    TestModule,
    AuthModule,
    UserModule,
    SmsModule,
    GatewayModule,
    MailModule,
    OssModule,
    WorkModule,
    TemplateModule,
    ChannelModule,
    PageModule,
    PassportModule.register({ secret: GlobalConfig.jwt_secret }),
    JwtModule.register({
      global: true,
      secret: GlobalConfig.jwt_secret,
      signOptions: { expiresIn: '3d' },
    }),
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: GlobalConfig.redis_url,
        options: {
          password: GlobalConfig.redis_password,
        },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
