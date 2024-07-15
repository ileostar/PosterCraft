import * as OAuth2Server from 'oauth2-server';
import { Provider } from '@nestjs/common';
import { OAuth2ServerModuleOptions } from './interfaces';
import {
  OAUTH2_SERVER_INSTANCE,
  OAUTH2_SERVER_OPTIONS,
} from './oauth2.constants';

export function createOAuth2ServerProviders(
  options: OAuth2ServerModuleOptions,
): Provider[] {
  return [
    {
      provide: OAUTH2_SERVER_OPTIONS,
      useValue: options,
    },
  ];
}

export const OAuth2ServerInstanceProvider = {
  provide: OAUTH2_SERVER_INSTANCE,
  useFactory: (options: OAuth2ServerModuleOptions) => {
    return new OAuth2Server(options);
  },
  inject: [OAUTH2_SERVER_OPTIONS],
};
