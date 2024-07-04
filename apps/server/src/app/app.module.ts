import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
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
