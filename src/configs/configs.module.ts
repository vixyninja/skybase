import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as joi from 'joi';
import {ConfigsService} from './configs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        // APP ENV
        NODE_ENV: joi.string().required(),
        PORT: joi.number().required(),
        VERSION: joi.string().required(),
        GROUP_EMAIL: joi.string().required(),
        DOMAIN: joi.string().required(),

        // DATABASE ENV
        POSTGRES_USER: joi.string().required(),
        POSTGRES_PASSWORD: joi.string().required(),
        POSTGRES_DB: joi.string().required(),
        POSTGRES_HOST: joi.string().required(),
        POSTGRES_PORT: joi.number().required(),

        // MONGO ENV
        MONGO_PORT: joi.number().required(),
        MONGO_HOST: joi.string().required(),
        MONGO_NAME: joi.string().required(),
        MONGO_APP_NAME: joi.string().required(),
        MONGO_USER_NAME: joi.string().required(),
        MONGO_USER_PASS: joi.string().required(),
        MONGO_GUI_USER_NAME: joi.string().required(),
        MONGO_GUI_USER_PASS: joi.string().required(),

        // REDIS ENV
        REDIS_HOST: joi.string().required(),
        REDIS_PORT: joi.number().required(),
        REDIS_TTL: joi.number().required(),

        // ADMIN ENV
        ADMIN_PORT: joi.string().required(),

        // THROTTLE ENV
        THROTTLE_TTL: joi.number().required(),
        THROTTLE_LIMIT: joi.number().required(),

        // MAILER ENV
        MAIL_HOST: joi.string().required(),
        MAIL_PORT: joi.number().required(),
        MAIL_USER: joi.string().required(),
        MAIL_PASS: joi.string().required(),

        // STORAGE ENV
        FOLDER_NAME: joi.string().required(),
        CLOUD_NAME: joi.string().required(),
        CLOUD_API_KEY: joi.string().required(),
        CLOUD_API_SECRET: joi.string().required(),

        // GOOGLE ENV
        GOOGLE_CLIENT_ID: joi.string().required(),
        GOOGLE_CLIENT_SECRET: joi.string().required(),

        // JWT ENV
        ACCESS_TOKEN_EXPIRES_IN: joi.string().required(),
        REFRESH_TOKEN_EXPIRES_IN: joi.string().required(),
        PRIVATE_KEY: joi.string().required(),
        PUBLIC_KEY: joi.string().required(),
        ALGORITHM: joi.string().required(),
        SESSION_SECRET_KEY: joi.string().required(),
        COOKIE_SECRET_KEY: joi.string().required(),

        // DATE TIME ENV
        TZ: joi.string().required(),
      }),
      envFilePath: ['.env'],
      cache: true,
      isGlobal: true,
    }),
  ],
  providers: [ConfigService, ConfigsService],
  exports: [ConfigModule, ConfigService, ConfigsService],
})
export class ConfigsModule {}
