import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OAuth2ServerOAuth = createParamDecorator(
  (data: unknown, context: ExecutionContext) =>
    context.switchToHttp().getResponse().locals.oauth,
);
