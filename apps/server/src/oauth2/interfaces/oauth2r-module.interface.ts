import * as OAuth2Server from 'oauth2-server';
import { ModuleMetadata, Type } from '@nestjs/common';

export type OAuth2ServerModuleOptions = OAuth2Server.ServerOptions;

export interface OAuth2ServerOptionsFactory {
  createOAuth2ServerOptions():
    | Promise<OAuth2ServerModuleOptions>
    | OAuth2ServerModuleOptions;
}

export interface OAuth2ServerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<OAuth2ServerOptionsFactory>;
  useClass?: Type<OAuth2ServerOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<OAuth2ServerModuleOptions> | OAuth2ServerModuleOptions;
  inject?: any[];
}
