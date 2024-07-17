import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import { GLOBAL_ROUTE_PREFIX, SWAGGER_ROUTE, VERSIONS } from './constants';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

const parseCorsRules = (CORS_ORIGIN?: string) => {
  if (CORS_ORIGIN) {
    const rules = CORS_ORIGIN.split(',').map((e) => e.trim());
    return rules.length === 1 ? rules[0] : rules;
  }

  return false;
};

export const configureApp = (app: NestFastifyApplication): void => {
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSIONS.V1,
  });

  app.enableCors({
    origin: parseCorsRules(process.env.CORS_ORIGIN),
  });

  app.setGlobalPrefix(GLOBAL_ROUTE_PREFIX);

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string) =>
      controllerKey.replace('Controller', ''),
  };
  const config = new DocumentBuilder()
    .setTitle('Kumocore API')
    .setDescription('REST API for NFT marketplaces')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup(SWAGGER_ROUTE, app, document);
};
