import * as OAuth2Server from 'oauth2-server';

export interface OAuth {
  code?: OAuth2Server.AuthorizationCode;
  token?: OAuth2Server.Token;
}
