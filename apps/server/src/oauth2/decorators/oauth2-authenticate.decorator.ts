import * as OAuth2Server from 'oauth2-server';
import { UseGuards, SetMetadata, applyDecorators } from '@nestjs/common';
import { OAuth2ServerAuthenticateGuard } from '../guards';
import { OAUTH2_SERVER_OPTIONS_METADATA } from '../oauth2.constants';

export function OAuth2ServerAuthenticate(
  options: OAuth2Server.AuthenticateOptions = {},
): ClassDecorator & MethodDecorator {
  return applyDecorators(
    SetMetadata(OAUTH2_SERVER_OPTIONS_METADATA, options),
    UseGuards(OAuth2ServerAuthenticateGuard),
  );
}
