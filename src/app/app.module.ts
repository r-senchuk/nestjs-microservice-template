import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '../shared/params/validation.schema';
import { APP_FILTER, APP_PIPE, HttpAdapterHost } from '@nestjs/core';
import PARAMETERS from '../shared/params/params.constants';
import { ParamsModule } from '../shared/params/params.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { NODE_ENV } from '../common/constants';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema }),
    TypeOrmModule.forRootAsync({
      imports: [ParamsModule],
      useFactory: (
        DB_HOST: string,
        DB_PORT: number,
        DB_USER: string,
        DB_PASSWORD: string,
        DB_NAME: string,
      ) => {
        return {
          type: 'postgres',
          host: DB_HOST,
          port: DB_PORT,
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
      inject: [
        PARAMETERS.DB_HOST,
        PARAMETERS.DB_PORT,
        PARAMETERS.DB_USER,
        PARAMETERS.DB_PASSWORD,
        PARAMETERS.DB_NAME,
      ],
    }),
    ParamsModule,
    ProfileModule,
    UsersModule,
    JwtModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({ whitelist: true, transform: true }),
    },
    {
      provide: APP_FILTER,
      useFactory: (NODE_ENV: NODE_ENV, httpAdapterHost) =>
        new HttpExceptionFilter(NODE_ENV, httpAdapterHost),
      inject: [PARAMETERS.NODE_ENV, HttpAdapterHost],
    },
  ],
})
export class AppModule {}
