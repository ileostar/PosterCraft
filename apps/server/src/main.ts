import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './modules/app/app.module';
import { appGlobalMiddleware } from './modules/app/useGlobal';

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
    .setTitle('PosterCraft Swagger')
    .setDescription('The PosterCraft API description')
    .setVersion('v1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(process.env.PORT || 3001);
}

bootstrap().then(() =>
  console.log('Server Started Swagger: http://localhost:3001/swagger'),
);
