import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import helmet from 'helmet';
import * as passport from 'passport';
import * as zlib from 'zlib';
import {AppModule} from './app.module';
import {setupSwagger} from './doc';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  const version = process.env.VERSION;
  const cookieSecret = process.env.COOKIE_SECRET_KEY;
  const port = process.env.PORT;
  const domain = process.env.DOMAIN;

  // GLOBAL CONFIG
  app.setGlobalPrefix(`api/${version}`);

  // MIDDLEWARES
  app.use(helmet());
  app.use(cors());
  app.use(cookieParser(cookieSecret));

  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY || 'secret',
      name: 'anonymous',
      proxy: true,
      unset: 'keep',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        sameSite: 'none',
        domain: domain,
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        path: '/',
        signed: true,
        partitioned: true,
        priority: 'medium',
      },
    }),
  );
  app.use(express.urlencoded({extended: true, limit: '50mb'}));
  app.use(
    compression({
      chunkSize: zlib.constants.Z_MIN_CHUNK,
      memLevel: zlib.constants.Z_DEFAULT_MEMLEVEL,
      level: 6,
      threshold: 100,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return compression.filter(req, res);
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  setupSwagger(app, version);
  await app.listen(port);
}

bootstrap()
  .then(function () {
    Logger.fatal(`🌚 Application is listening on port ${process.env.PORT} , ${process.env.NODE_ENV} 👀 😈 `);
    Logger.fatal(`🌚 Swagger is running on http://localhost:${process.env.PORT}/documentation`);
  })
  .catch((error) => Logger.error(error));
