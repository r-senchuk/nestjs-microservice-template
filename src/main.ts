import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { configureApp } from './main.config';
import cluster from 'cluster';
import os from 'os';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  configureApp(app);
  await app.listen(process.env.HTTP_PORT as string, '0.0.0.0');
}

function clusterize(callback: () => void): void {
  const numCPUs = os.cpus().length;
  console.log(numCPUs);
  if (cluster.isPrimary) {
    console.log(`MASTER SERVER (${process.pid}) IS RUNNING `);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    callback();
  }
}
clusterize(bootstrap);
