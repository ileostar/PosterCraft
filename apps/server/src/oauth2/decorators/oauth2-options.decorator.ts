import * as OAuth2Server from 'oauth2-server';
import { SetMetadata } from '@nestjs/common';
import { OAUTH2_SERVER_OPTIONS_METADATA } from '../oauth2.constants';

export function OAuth2ServerOptions(
  options:
    | OAuth2Server.AuthenticateOptions
    | OAuth2Server.AuthorizeOptions
    | OAuth2Server.TokenOptions,
) {
  return SetMetadata(OAUTH2_SERVER_OPTIONS_METADATA, options);
}
