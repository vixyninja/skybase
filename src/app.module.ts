import {CacheModule as BaseCacheModule, CacheModuleAsyncOptions, CacheStore} from '@nestjs/cache-manager';
import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE} from '@nestjs/core';
import {ServeStaticModule} from '@nestjs/serve-static';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {TypeOrmModule} from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import {join} from 'path';
import {AuthModule, JwtGuard} from './auth';
import {ConfigsModule, ConfigsService} from './configs';
import {HttpExceptionFilter} from './filters';
import {TimeoutInterceptor} from './interceptors';
import {LoggersMiddleware} from './middlewares';
import {UserModule} from './modules/user';
import {ValidationPipe} from './pipes';

@Module({
  imports: [
    ConfigsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      renderPath: '/',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      useFactory: async (configsService: ConfigsService) => configsService.postgresConnection(),
    }),
    BaseCacheModule.registerAsync<CacheModuleAsyncOptions>({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      isGlobal: true,
      useFactory: async (configs: ConfigsService) => {
        const store = await redisStore.redisStore({
          socket: {
            host: configs.redisHost(),
            port: configs.redisPort(),
          },
        });

        return {
          store: {
            create: () => store as unknown as CacheStore,
          },
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      useFactory: (configService: ConfigsService) => ({
        throttlers: [
          {
            ttl: configService.throttleTTL(),
            limit: configService.throttleLimit(),
          },
        ],
      }),
    }),
    // LoggerModule,

    // ! BUSINESS MODULES
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggersMiddleware).forRoutes('*');
  }
}
