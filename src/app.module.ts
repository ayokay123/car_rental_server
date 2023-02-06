import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { carControllerModule } from './interface/controllers/Car/api';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { locationControllerModule } from './interface/controllers/Location/api';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PWD'),
        database: config.get('DB_NAME'),
        ssl: {
          rejectUnauthorized: false,
          cert: undefined,
        },
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('DB_SYNCHORIZE'),
        autoLoadEntities: true,
        logging: config.get('DB_LOGGING'),
        // extra: { connectionLimit: 100 },
      }),
      inject: [ConfigService],
    }),
    LoggerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        const isLocalDevelopment = config.get('NODE_ENV');
        return {
          pinoHttp: {
            name: 'RSOC',
            level: 'debug',
            transport:
              isLocalDevelopment != 'production'
                ? {
                    target: 'pino-pretty',
                  }
                : null,
            serializers: {
              req: (req) => {
                return {
                  id: req.id,
                  method: req.method,
                  url: req.url,
                  query: req.query,
                  params: req.params,
                  host: req.headers.host,
                  origin: req.headers.origin,
                };
              },
              res: (res) => {
                return {
                  statusCode: res.statusCode,
                };
              },
              err: (err) => {
                return {
                  type: err.type,
                  message: err.message,
                };
              },
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    carControllerModule,
    locationControllerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'tmp'),
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
