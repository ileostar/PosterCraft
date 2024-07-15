import { DynamicModule, Module, Provider, Global } from '@nestjs/common';
import {
  OAuth2ServerModuleOptions,
  OAuth2ServerModuleAsyncOptions,
  OAuth2ServerOptionsFactory,
} from './interfaces';
import { OAUTH2_SERVER_OPTIONS } from './oauth2.constants';
import {
  createOAuth2ServerProviders,
  OAuth2ServerInstanceProvider,
} from './oauth2.providers';

@Global()
@Module({})
export class OAuth2ServerModule {
  static forRoot(options: OAuth2ServerModuleOptions): DynamicModule {
    const providers = [
      ...createOAuth2ServerProviders(options),
      OAuth2ServerInstanceProvider,
    ];
    return {
      module: OAuth2ServerModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(options: OAuth2ServerModuleAsyncOptions): DynamicModule {
    const providers = [
      ...this.createAsyncProviders(options),
      OAuth2ServerInstanceProvider,
    ];
    return {
      module: OAuth2ServerModule,
      imports: options.imports || [],
      providers,
      exports: providers,
    };
  }

  private static createAsyncProviders(
    options: OAuth2ServerModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: OAuth2ServerModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OAUTH2_SERVER_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: OAUTH2_SERVER_OPTIONS,
      useFactory: async (optionsFactory: OAuth2ServerOptionsFactory) =>
        await optionsFactory.createOAuth2ServerOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
