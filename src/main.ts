import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { AppConstants } from './config/appConstants';
import { NestExpressApplication } from '@nestjs/platform-express';

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const portNo = configService.get('APPSERVER_PORT');
  const isGenerateYAML = configService.get('GENERATE_YAML');

  app.setGlobalPrefix('api');

  // enable cors
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    allowedHeaders: [
      'authorization',
      'Access-Control-Allow-Origin',
      'Content-Type',
      'SOAPAction',
      'apikey',
      'Internal-Key',
      // 'X-Requested-With',
      // 'Accept-Version',
      // 'Content-MD5',
      // 'CSRF-Token',
      // 'Content-Type',
    ],
    credentials: false,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  //setup swagger
  const options = new DocumentBuilder()
    .setTitle('Car rental Management system')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag(AppConstants.API_TAGS.CAR)
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // generate yaml file
  if (isGenerateYAML) {
    const swaggerYaml = yaml.dump(document);
    await fs.writeFileSync('./api-docs/swagger.yaml', swaggerYaml);
  }

  SwaggerModule.setup('/api-docs', app, document);

  app.useLogger(app.get(Logger));
  await app.listen(portNo);
}
bootstrap();
