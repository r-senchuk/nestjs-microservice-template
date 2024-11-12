import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '../shared/params/validation.schema';
import { APP_FILTER } from '@nestjs/core';
import PARAMETERS from '../shared/params/params.constants';
import { ParamsModule } from '../shared/params/params.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaExceptionFilter } from '../common/filters/kafka-exception.filter';
import { EventListenerModule } from './event-listener/event-listener.module';

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
    EventListenerModule,
    ParamsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: () => new KafkaExceptionFilter(),
    },
  ],
})
export class AppModule {}
