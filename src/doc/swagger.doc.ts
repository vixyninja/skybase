import {NestExpressApplication} from '@nestjs/platform-express';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export function setupSwagger(app: NestExpressApplication, version: string) {
  const documentBuilder = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription(`### REST API for NestJS application <br/> ### Author: vixyninja <br/> ### Version: version`)
    .setVersion(version)
    .addTag('auth')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .setTermsOfService('http://swagger.io/terms/')
    .setLicense('Apache 2.0', 'https://raw.githubusercontent.com/nestjs/swagger/master/LICENSE')
    .setContact('vixyninja', 'https://github.com/vixyninja', 'hhvy2003.dev@gmail.com');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customCssUrl: 'swagger.css',
  });
}
