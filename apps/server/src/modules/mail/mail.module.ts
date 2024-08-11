import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CacheModule } from '../cache/cache.modules';
import { UserModule } from '../user/user.module';
import { GlobalConfig } from 'src/config';

@Module({
  imports: [
    UserModule,
    CacheModule,
    MailerModule.forRoot({
      transport: {
        host: GlobalConfig.mail.host,
        port: GlobalConfig.mail.port,
        secure: false,
        auth: {
          user: GlobalConfig.mail.id,
          pass: GlobalConfig.mail.pass,
        },
      },
      defaults: {
        from: '"PosterCraft" liuxinghao030@163.com',
      },
      template: {
        dir: __dirname + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
