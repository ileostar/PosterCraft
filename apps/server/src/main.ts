import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app/app.module';
import { appGlobalMiddleware } from './middlewares/global.middleware.ts';
import { projectConfig } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      /^http:\/\/localhost(:\d+)?$/,
      /^http:\/\/poster-craft\.leostar\.top(:81)?$/,
    ],
  });

  appGlobalMiddleware(app);
  const config = new DocumentBuilder()
    .setTitle('PosterCraft API接口文档📄')
    .setDescription('PosterCraft-海报编辑器 API接口文档📄')
    .setVersion('v1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, projectConfig.swaggerConfig);
  await app.listen(projectConfig.port);
}

bootstrap().then(() => Logger.log(projectConfig.StartLog));
