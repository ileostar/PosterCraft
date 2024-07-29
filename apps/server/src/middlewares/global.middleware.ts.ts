import { INestApplication, ValidationPipe } from '@nestjs/common';

import { HttpExceptionFilter } from '../exceptions/exception.filter';
import { ResponseInterceptor } from '../interceptor/response.interceptor';

export const appGlobalMiddleware = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
};
