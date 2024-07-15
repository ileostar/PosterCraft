import * as OAuth2Server from 'oauth2-server';
import {
  Inject,
  Injectable,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  OAUTH2_SERVER_INSTANCE,
  OAUTH2_SERVER_OPTIONS_METADATA,
} from '../oauth2.constants';

@Injectable()
export abstract class OAuth2ServerGuard {
  @Inject(Reflector) protected readonly reflector!: Reflector;

  @Inject(OAUTH2_SERVER_INSTANCE)
  protected readonly oauthServer: OAuth2Server;

  canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const response = this.getResponse(context);
    const options = this.getOptions(context);
    return this.execute(context, request, response, options);
  }

  protected abstract execute(
    context: ExecutionContext,
    request: OAuth2Server.Request,
    response: OAuth2Server.Response,
    options?: Parameters<OAuth2Server[keyof OAuth2Server]>[2],
  ): Promise<boolean>;

  private getRequest(context: ExecutionContext): OAuth2Server.Request {
    const req = context.switchToHttp().getRequest();
    return new OAuth2Server.Request(req);
  }

  private getResponse(context: ExecutionContext): OAuth2Server.Response {
    const res = context.switchToHttp().getResponse();
    return new OAuth2Server.Response(res);
  }

  private getOptions<
    T extends
      | OAuth2Server.TokenOptions
      | OAuth2Server.AuthorizeOptions
      | OAuth2Server.AuthenticateOptions,
  >(context: ExecutionContext): T {
    return this.reflector.get<T, symbol>(
      OAUTH2_SERVER_OPTIONS_METADATA,
      context.getHandler(),
    );
  }

  protected handleResponse(
    context: ExecutionContext,
    response: OAuth2Server.Response,
  ) {
    const res = context.switchToHttp().getResponse();

    if (response.status === 302) {
      const location = response.headers.location;
      delete response.headers.location;
      res.set(response.headers);
      res.redirect(location);
    } else {
      res.set(response.headers);
      res.status(response.status).send(response.body);
    }
  }

  protected handleError(
    context: ExecutionContext,
    error: OAuth2Server.OAuthError,
    response: OAuth2Server.Response,
  ) {
    const res = context.switchToHttp().getResponse();

    if (response) {
      res.set(response.headers);
    }

    if (error instanceof OAuth2Server.UnauthorizedRequestError) {
      throw new UnauthorizedException();
    }

    throw new HttpException(
      { error: error.name, error_description: error.message },
      error.code,
    );
  }
}
