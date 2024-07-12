import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appGlobalMiddleware } from '../src/app/useGlobal';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    await app.init();
  });

  it('/swagger (GET)', () => {
    return request(app.getHttpServer()).get('/swagger').expect(200);
  });
});
