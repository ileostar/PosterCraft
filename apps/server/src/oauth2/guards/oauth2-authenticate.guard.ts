import * as OAuth2Server from 'oauth2-server';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { OAuth2ServerGuard } from './oauth2.guard';

@Injectable()
export class OAuth2ServerAuthenticateGuard extends OAuth2ServerGuard {
  protected async execute(
    context: ExecutionContext,
    request: OAuth2Server.Request,
    response: OAuth2Server.Response,
    options?: OAuth2Server.AuthenticateOptions,
  ): Promise<boolean> {
    try {
      const token = await this.oauthServer.authenticate(
        request,
        response,
        options,
      );
      const res = context.switchToHttp().getResponse();
      res.locals.oauth = { token };
      return true;
    } catch (error) {
      this.handleError(context, error, response);
    }
  }
}
