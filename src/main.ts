import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppModule as AppQueue } from './app-queue/app-queue.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { configureApp } from './main.config';
import { kafkaConfigs } from './app-queue/main.configs';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  configureApp(app);
  await app.listen(process.env.HTTP_PORT as string, '0.0.0.0');

  const microserviceQueue =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AppQueue,
      kafkaConfigs,
    );

  await microserviceQueue.listen();
}
bootstrap();
