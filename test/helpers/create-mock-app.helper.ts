import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { configureApp } from '../../src/main.config';

export const createMockAppHelper =
  async (): Promise<NestFastifyApplication> => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    configureApp(app);

    return app;
  };
